import {useRef, useState} from "react";
import * as React from "react";
import {
    Shuffle,
    SkipBack,
    Pause,
    Play,
    SkipForward,
    Repeat,
    Volume2,
    Maximize
} from "lucide-react"
import s from "./Player.module.css"

export const Player = () => {
    const [isPlaying, setIsPlaying] = useState(true)
    const [volume, setVolume] = useState(70)
    const [progress, setProgress] = useState(55) // 2:39 из 4:22 ≈ 55%

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, "0")}`
    }
    const volumeTrackRef = useRef<HTMLDivElement>(null)

    const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!volumeTrackRef.current) return
        const rect = volumeTrackRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
        setVolume(percentage)
    }

    const currentTime = 159 // 2:39 в секундах
    const totalTime = 262   // 4:22 в секундах

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const percentage = (x / rect.width) * 100
        setProgress(percentage)
    }


    return (
        <div className={s.player}>
            {/* Левая часть - информация о треке */}
            <div className={s.trackInfo}>
                <div className={s.cover}>
                    <span className={s.coverNumber}>1</span>
                </div>
                <div className={s.trackDetails}>
                    <div className={s.trackName}>Play It Safe</div>
                    <div className={s.artistName}>Julia Wolf</div>
                </div>
            </div>

            {/* Центральная часть - контролы */}
            <div className={s.controls}>
                <div className={s.controlButtons}>
                    <button className={s.controlBtn} aria-label="Shuffle">
                        <Shuffle size={16}/>
                    </button>
                    <button className={s.controlBtn} aria-label="Previous">
                        <SkipBack size={20} fill="currentColor"/>
                    </button>
                    <button
                        className={s.playBtn}
                        onClick={() => setIsPlaying(!isPlaying)}
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? <Pause size={20} fill="currentColor"/> : <Play size={20} fill="currentColor"/>}
                    </button>
                    <button className={s.controlBtn} aria-label="Next">
                        <SkipForward size={20} fill="currentColor"/>
                    </button>
                    <button className={s.controlBtn} aria-label="Repeat">
                        <Repeat size={16}/>
                    </button>
                </div>

                <div className={s.progressBar}>
                    <span className={s.time}>{formatTime(currentTime)}</span>
                    <div className={s.progressTrack} onClick={handleProgressClick}>
                        <div className={s.progressFill} style={{width: `${progress}%`}}/>
                    </div>
                    <span className={s.time}>{formatTime(totalTime)}</span>
                </div>
            </div>

            {/* Правая часть - громкость */}
            <div className={s.volume}>
                <button className={s.controlBtn} aria-label="Volume">
                    <Volume2 size={20}/>
                </button>

                <div className={s.volumeSlider} onClick={handleVolumeClick} ref={volumeTrackRef}>
                    <div className={s.volumeSliderFill} style={{width: `${volume}%`}}/>
                </div>

                <button className={s.controlBtn} aria-label="Fullscreen">
                    <Maximize size={16}/>
                </button>
            </div>
        </div>
    )
}