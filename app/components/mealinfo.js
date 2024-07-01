import React, { useState, useEffect } from 'react';
import MealBio from './mealbio';
import IngredientsTable from './ingredients.js';
import Image from 'next/image';
import Instructions from './instructions.js';
import { useRouter } from 'next/navigation';

export default function MealInfo(props) {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [timer, setTimer] = useState(0);
    const [countdown, setCountdown] = useState(null);
    const [audio] = useState(typeof Audio !== "undefined" && new Audio('/alarm.mp3'));
    const [onScreen, setOnScreen] = useState(false);

    const handleClose = () => {
        router.back();
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (timer === -1) {
            audio.play();
        }
    }, [timer, audio]);

    const startTimer = () => {
        if (countdown) clearInterval(countdown);
        let time = parseInt(document.getElementById('timeInput').value) * 60; // Convert minutes to seconds
        setTimer(time);
        const newCountdown = setInterval(() => {
            setTimer(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(newCountdown);
                    return -1;
                }
                return prevTime - 1;
            });
        }, 1000);
        setCountdown(newCountdown);
    };

    const cancelTimer = () => {
        if (countdown) clearInterval(countdown);
        audio.pause();
        setTimer(0);
        setCountdown(null);
    };

    useEffect(() => {
        return () => countdown && clearInterval(countdown);
    }, [countdown]);

    
    // Function to request a wake lock
    async function requestWakeLock() {
        try {
            // Check if the Wake Lock API is supported
            if ('wakeLock' in navigator) {
                // Request a wake lock for the screen
                const wakeLock = await navigator.wakeLock.request('screen');
                alert('Wake Lock is active');
                
                // Listen for visibility change or page hide events
                document.addEventListener('visibilitychange', async () => {
                    if (document.visibilityState === 'visible' && wakeLock.released) {
                        // Re-acquire the wake lock when the document is visible again
                        await requestWakeLock();
                    }
                });
                
                // Handling the release of the lock
                wakeLock.addEventListener('release', () => {
                    alert('Screen Wake Lock was released');
                });
                
                return wakeLock;
            } else {
                alert('Wake Lock API is not supported in this browser.');
            }
        } catch (err) {
            // Handle potential errors, such as permission issues or others
            alert(`Failed to enable Wake Lock: ${err.name}, ${err.message}`);
        }
    }
    
    function handleShowToast() {
        document.getElementById('toast-warning').style.display = 'block';
        setTimeout(() => {
            document.getElementById('toast-warning').style.display = 'none';
        }, 3000);
        requestWakeLock();


    }



    return (
        <div style={{overflowY:'auto', maxHeight:'100vh', overflowY:'auto'}}>


            <div className='flex w-full ' style={{justifyContent:'space-between'}}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={handleClose}>Close</button>
                <button  className="  m-2 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleShowToast}>
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>

      </button>

            </div>
            <div className='flex' style={{ justifyContent: 'center' }}>
                <figure className="relative max-w-sm transition-all">
                    <Image className="rounded-lg" src={props.mealImage} alt="image description" width={300} height={300}/>
                    {props.mealYoutube &&
                        <button type="button" className="absolute bottom-0 right-0 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                            <a href={props.mealYoutube} target="_blank">Watch Video</a>
                        </button>
                    }
                </figure>
            </div>
            <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white text-center">{props.mealTitle}</h1>
            <hr className="w-64 h-1 mx-auto my-4 bg-gray-100 border-0 rounded dark:bg-white" />
            <div className="flex justify-center flex-wrap">
                <MealBio svg="/regions.svg" bio={props.mealRegion} />
                <MealBio svg="/categories.svg" bio={props.mealCategory} />
                {props.mealTags && <MealBio svg="/tags.svg" bio={props.mealTags} />}
            </div>
            <div>
                <h2 className="mt-3 text-xl font-bold text-gray-900 dark:text-white text-center">Ingredients</h2>
                <IngredientsTable ingredientArray={props.mealIngredients} measureArray={props.mealMeasures}/>
                <h2 className="mt-3 text-xl font-bold text-gray-900 dark:text-white text-center">Instructions</h2>
                <Instructions mealInstructions={props.mealInstructions} />
            </div>
            <button id="openModal" type="button" className="fixed bottom-2 right-2 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleOpenModal}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Z"/></svg>
            </button>

            {showModal && (
                <div id="timerModal" tabIndex="-1" className="fixed inset-0 z-50 overflow-y-auto" aria-hidden="true" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold text-gray-900">Set Timer for Cooking</h3>
                                <button type="button" className="text-gray-500 bg-transparent hover:bg-gray-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={handleCloseModal}>
                                    <span>&#10005;</span>
                                </button>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="timeInput" className="block text-sm font-medium text-gray-700">Minutes:</label>
                                <input type="number" id="timeInput" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter time in minutes" min="1"/>
                            </div>
                            <div className="mt-4">
                                <button type="button" className="inline-flex justify-center w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500" onClick={startTimer}>
                                    Start Timer
                                </button>
                                <button type="button" className="mt-2 inline-flex justify-center w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500" onClick={cancelTimer}>
                                    Cancel Timer
                                </button>
                            </div>
                            <div className="mt-4">
                                {timer > 0 ? (
                                    <div className="text-center text-2xl font-semibold text-red-500">{Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')} left</div>
                                ) : (
                                    <div className="text-center text-2xl font-semibold text-green-500">Time’s up!</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

<div style={{display:'none'}} id="toast-warning" className='fixed bottom-1 w-full'>
            <div  class=" flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
        </svg>
        <span class="sr-only">Warning icon</span>
    </div>
    <div class="ms-3 text-sm font-normal">Phone Sleep Turned Off</div>
    </div>
</div>
        </div>
    );
}
