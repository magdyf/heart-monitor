'use client'

import { useState, useEffect, useRef, useCallback } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function HeartRateMonitor() {
    const [isRecordingState, setIsRecordingState] = useState(false);
    const [heartRate, setHeartRate] = useState(null)
    const [instantRate, setInstantRate] = useState(null)
    const [microphoneAvailable, setMicrophoneAvailable] = useState(null)
    const [debug, setDebug] = useState({ max: 0, min: 0, average: 0, amplitude: 0, threshold: 0, timeSinceLastPeak: 0 })
    const [manualHeartRate, setManualHeartRate] = useState(null)
    const [taps, setTaps] = useState([]);
    const [heartSize, setHeartSize] = useState(100);
    const lastTapTimeRef = useRef(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const [audioInputMethod, setAudioInputMethod] = useState('');
    const audioContextRef = useRef(null)
    const streamRef = useRef(null)
    const analyserRef = useRef(null)
    const dataArrayRef = useRef(null)
    const sourceRef = useRef(null)
    const canvasRef = useRef(null)
    const peakThreshold = useRef(0)
    const lastPeakTime = useRef(0)
    const heartRateHistory = useRef([])
    const isRecordingRef = useRef(false);

    useEffect(() => {
        checkAudioCapabilities();
    }, []);


    const setIsRecording = useCallback((value) => {
        isRecordingRef.current = value;
        setIsRecordingState(value);
    }, []);


    const checkAudioCapabilities = useCallback(async () => {
        if (window.navigator.mediaDevices && window.navigator.mediaDevices.getUserMedia) {
            setAudioInputMethod('modern');
            try {
                await requestMicrophonePermission();
            } catch (error) {
                console.error('Error in modern audio method:', error);
                setAudioInputMethod('legacy');
                setWarningMessage('Modern audio input not available. Falling back to legacy method.');
            }
        } else if (window.navigator.getUserMedia) {
            setAudioInputMethod('legacy');
            setWarningMessage('Your browser is using a legacy audio input method. Consider updating your browser for better performance.');
        } else {
            setAudioInputMethod('unsupported');
            setErrorMessage('Audio input is not supported in this browser. Please try the manual heart rate input or use a different browser.');
        }
    }, []);


    const requestMicrophonePermission = async () => {
        try {
            const stream = await window.navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop());
            setMicrophoneAvailable(true);
            setErrorMessage('');
        } catch (err) {
            console.error('Microphone permission error:', err);
            handleMicrophoneError(err);
            throw err;
        }
    };


    const handleMicrophoneError = useCallback((err) => {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
            setErrorMessage('Microphone access was denied. Please allow microphone access in your browser settings and reload the page.');
        } else if (err.name === 'NotFoundError') {
            setErrorMessage('No microphone found. Please ensure your device has a working microphone.');
        } else {
            setErrorMessage(`Error accessing the microphone: ${err.message}. Please check your browser settings and ensure microphone access is allowed.`);
        }
        setMicrophoneAvailable(false);
    }, []);


    const startRecording = useCallback(async () => {
        if (!isSecureContext) {
            setErrorMessage('Microphone access requires a secure connection (HTTPS). Please use a secure connection and try again.');
            return;
        }
        //console.log("Starting recording");
        try {
            setErrorMessage('');
            setWarningMessage('');

            // Create AudioContext
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            //console.log("AudioContext created:", audioContextRef.current);

            // Create AnalyserNode
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 2048;
            //console.log("AnalyserNode created:", analyserRef.current);

            let stream;

            try {
                if (audioInputMethod === 'modern') {
                    stream = await navigator.mediaDevices.getUserMedia({
                        audio: {
                            echoCancellation: false,
                            noiseSuppression: false,
                            autoGainControl: false
                        }
                    });
                } else if (audioInputMethod === 'legacy') {
                    stream = await new Promise((resolve, reject) => {
                        navigator.getUserMedia({ audio: true }, resolve, reject);
                    });
                } else {
                    throw new Error('Audio input is not supported');
                }
                //console.log("Audio stream obtained successfully");
            } catch (err) {
                console.error('Error getting audio stream:', err);
                handleMicrophoneError(err);
                throw err;
            }

            streamRef.current = stream;
            sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
            sourceRef.current.connect(analyserRef.current);
            //console.log("Audio source connected to analyser");

            const bufferLength = analyserRef.current.frequencyBinCount;
            dataArrayRef.current = new Uint8Array(bufferLength);
            //console.log("Buffer created with length:", bufferLength);

            setIsRecording(true);
            //console.log('Set isRecording to true');

        } catch (error) {
            console.error('Error starting recording:', error);
            setErrorMessage(`Failed to start recording: ${error.message}. Please try the troubleshooting steps or use manual input.`);
            cleanupAudioResources();
            setIsRecording(false);
        }
    }, [audioInputMethod, handleMicrophoneError, setIsRecording]);

    const cleanupAudioResources = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (sourceRef.current) {
            sourceRef.current.disconnect();
            sourceRef.current = null;
        }
        if (audioContextRef.current) {
            audioContextRef.current.close().catch(console.error);
            audioContextRef.current = null;
        }
        if (analyserRef.current) {
            analyserRef.current = null;
        }
        dataArrayRef.current = null;
        heartRateHistory.current = [];
        setHeartRate(null);
        setInstantRate(null);
    }, [setHeartRate, setInstantRate]);
    
    const stopRecording = useCallback(() => {
        //console.log("Stopping recording");
        setIsRecording(false);
        cleanupAudioResources();
        if (dataArrayRef.current) {
            dataArrayRef.current.fill(0);
        }
        //console.log("Recording stopped and cleaned up");
    }, [setIsRecording]);


    const calculateHeartRate = useCallback((dataArray) => {
        if (!audioContextRef.current) {
            console.error("AudioContext is not available");
            return null;
        }

        const currentTime = audioContextRef.current.currentTime;
        let max = 0;
        let min = 255;
        let sum = 0;

        for (let i = 0; i < dataArray.length; i++) {
            const value = dataArray[i];
            if (value > max) max = value;
            if (value < min) min = value;
            sum += value;
        }

        const average = sum / dataArray.length;
        const amplitude = max - min;

        // Dynamically adjust the threshold
        peakThreshold.current = peakThreshold.current * 0.95 + (amplitude * 0.05);

        const timeSinceLastPeak = currentTime - lastPeakTime.current;

        setDebug({
            max,
            min,
            average: average.toFixed(2),
            amplitude,
            threshold: peakThreshold.current,
            timeSinceLastPeak
        });

        // Detect a peak when the max value exceeds the threshold
        if (max > average + peakThreshold.current) {
            // Check if enough time has passed for this to be a new beat
            if (timeSinceLastPeak > 0.5) { // Minimum time between beats
                const beatDuration = currentTime - lastPeakTime.current;
                lastPeakTime.current = currentTime;

                // Check if this peak is part of the same beat or a new beat
                if (beatDuration > 0.12) { // If more than 120ms has passed, consider it a new beat
                    const instantaneousHeartRate = Math.round(60 / beatDuration);

                    if (instantaneousHeartRate >= 40 && instantaneousHeartRate <= 200) {
                        //console.log("Valid heart rate detected:", instantaneousHeartRate);
                        return instantaneousHeartRate;
                    }
                } else {
                    //console.log("Second sound of the same beat detected");
                }
            } else {
                //console.log("Peak detected, but too soon after the last one");
            }
        }

        return null;
    }, []);



    const detectHeartRate = useCallback(() => {
        //console.log("detectHeartRate called, isRecording:", isRecordingRef.current, "analyserRef.current:", !!analyserRef.current);

        if (!analyserRef.current || !isRecordingRef.current) {
            //console.log("Detection stopped: analyser not available or recording stopped");
            return;
        }

        try {
            analyserRef.current.getByteTimeDomainData(dataArrayRef.current);
            //console.log("Audio data received, first few values:", dataArrayRef.current.slice(0, 5));

            const heartRateValue = calculateHeartRate(dataArrayRef.current);
            if (heartRateValue) {
                setInstantRate(heartRateValue);
                heartRateHistory.current.push(heartRateValue);
                if (heartRateHistory.current.length > 10) {
                    heartRateHistory.current.shift();
                }
                const averageHeartRate = Math.round(
                    heartRateHistory.current.reduce((a, b) => a + b) / heartRateHistory.current.length
                );
                setHeartRate(averageHeartRate);
                //console.log("Updated average heart rate:", averageHeartRate);
            } else {
                //console.log("No valid heart rate detected in this frame");
            }

            if (isRecordingRef.current) {
                requestAnimationFrame(detectHeartRate);
            }
        } catch (error) {
            console.error("Error in detectHeartRate:", error);
            setErrorMessage(`Error detecting heart rate: ${error.message}. Please try stopping and starting the monitoring.`);
            stopRecording();
        }
    }, [calculateHeartRate, stopRecording, setInstantRate, setHeartRate, setErrorMessage]);
    const drawWaveform = useCallback(() => {
        if (!canvasRef.current || !analyserRef.current || !isRecordingState) return;

        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');
        const bufferLength = analyserRef.current.frequencyBinCount;
        let dataArray = dataArrayRef.current;

        // If dataArray is null or its length doesn't match bufferLength, reinitialize it
        if (!dataArray || dataArray.length !== bufferLength) {
            dataArray = new Uint8Array(bufferLength);
            dataArrayRef.current = dataArray;
        }

        const draw = () => {
            if (!isRecordingState || !analyserRef.current) {
                // Stop the animation if we're no longer recording or if analyser is null
                return;
            }

            requestAnimationFrame(draw);

            try {
                analyserRef.current.getByteTimeDomainData(dataArray);

                canvasCtx.fillStyle = 'rgb(200, 200, 200)';
                canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
                canvasCtx.lineWidth = 2;
                canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
                canvasCtx.beginPath();

                const sliceWidth = canvas.width * 1.0 / bufferLength;
                let x = 0;

                for (let i = 0; i < bufferLength; i++) {
                    const v = (dataArray[i] / 128.0) * 2 - 1;
                    const y = (v * canvas.height / 2) + canvas.height / 2;

                    if (i === 0) {
                        canvasCtx.moveTo(x, y);
                    } else {
                        canvasCtx.lineTo(x, y);
                    }

                    x += sliceWidth;
                }

                canvasCtx.lineTo(canvas.width, canvas.height / 2);
                canvasCtx.stroke();

                // Draw threshold line
                canvasCtx.beginPath();
                canvasCtx.strokeStyle = 'rgb(255, 0, 0)';
                const thresholdY = ((128 + peakThreshold.current) / 256) * canvas.height;
                canvasCtx.moveTo(0, thresholdY);
                canvasCtx.lineTo(canvas.width, thresholdY);
                canvasCtx.stroke();
            } catch (error) {
                console.error('Error in draw function:', error);
            }
        };

        draw();
    }, [isRecordingState]);

    useEffect(() => {
        if (isRecordingState) {
            //console.log('isRecording is true, starting detection and waveform');
            detectHeartRate();
            drawWaveform();
        }else{
            //console.log('isRecording is false, stopping detection and waveform');
        }
    }, [isRecordingState, detectHeartRate, drawWaveform]);

    const handleTap = () => {
        const now = Date.now();

        // Debounce taps to prevent double-counting
        if (now - lastTapTimeRef.current > 200) { // 200ms debounce
            lastTapTimeRef.current = now;

            setTaps(prevTaps => {
                const newTaps = [...prevTaps, now].slice(-10);
                calculateManualHeartRate(newTaps);
                return newTaps;
            });
            setHeartSize(120); // Increase size when tapped

            // Reset heart size after a short delay
            setTimeout(() => setHeartSize(100), 150);
        }
    };

    const calculateManualHeartRate = (currentTaps) => {
        if (currentTaps.length < 2) return;

        const intervals = [];
        for (let i = 1; i < currentTaps.length; i++) {
            intervals.push(currentTaps[i] - currentTaps[i - 1]);
        }

        const averageInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
        const bpm = Math.round(60000 / averageInterval);

        setManualHeartRate(bpm);
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md text-gray-900 dark:text-gray-100">
            <h3 className="text-3xl font-bold mb-4 text-center">Heart Listener</h3>
            <p className="mb-6 text-center text-lg opacity-65">
                Place microphone near pulse (works best near heart)
            </p>
            {errorMessage && (
                <Alert variant="destructive" className="mb-4 border-red-500 border-4 ">
                    <AlertDescription className="text-lg font-bold">{errorMessage}</AlertDescription>
                </Alert>
            )}
            {warningMessage && (
                <Alert variant="warning" className="mb-4 border-yellow-500 border-4">
                    <AlertDescription className="text-lg font-bold text-black-600 dark:text-gray-400">
                        {warningMessage}
                    </AlertDescription>
                </Alert>
            )}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 mb-4"
                onClick={isRecordingState ? stopRecording : startRecording}
            >
                {isRecordingState ? 'Stop Monitoring' : 'Start Monitoring'}
            </button>

            {isRecordingState && (
                <div className="mt-6 text-center dar:bg:">
                    <p className="text-3xl font-bold dar:text-gray-100">{heartRate || 'Processing...'}</p>
                    <p className="text-gray-600">Average BPM</p>
                    <canvas ref={canvasRef} width="300" height="100" className="mt-4" />
                </div>
            )}

            <div className="mt-24 text-center w-full">
                <h3 className="text-3xl font-bold">Heart Tapper</h3>
                <p className="mt-4 text-xl opacity-65">
                    Tap the heart in rhythm with your pulse
                </p>
                <div className="flex justify-center items-center h-80 relative">
                    <button
                        onMouseDown={handleTap}
                        onTouchStart={handleTap}
                        className="relative bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition-all duration-150 focus:outline-none"
                        style={{
                            width: `${heartSize * 2}px`,
                            height: `${heartSize * 2}px`,
                        }}
                    >
                        <svg
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            style={{
                                width: `${heartSize}px`,
                                height: `${heartSize}px`,
                            }}
                        >
                            <path
                                fillRule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
                <h3 className="text-3xl font-bold mb-8">
                    Manual heart rate: {manualHeartRate !== null ? `${manualHeartRate} BPM` : '-- BPM'}
                </h3>
            </div>
        </div>
    );
}