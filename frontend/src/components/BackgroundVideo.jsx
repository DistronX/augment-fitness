import React from 'react';

export default function BackgroundVideo() {
    return (
        <div>
            <video
                autoPlay
                loop
                muted
                style={{
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: -1,
                }}
            >
                <source src={'/assets/videoplayback.webm'} type="video/webm" />
                Your browser does not support the video tag.
            </video>
        </div>

    )
}
