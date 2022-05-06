import React from 'react';
import './styles.scss';

function AlbumItem({ album }) {
    return (
        <div className="album__item">
            <img src={album.thumbnailUrl} alt={album.name} />
            <p>{album.name}</p>
        </div>
    );
}

export default AlbumItem;
