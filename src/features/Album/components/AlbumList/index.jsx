import React from 'react';
import AlbumItem from '../AlbumItem';
import './styles.css';
AlbumList.propTypes = {

};

function AlbumList({ albums }) {
    return (
        <ul className="album__list">
            {albums.map(album => (
                <li key={album.id}>
                    <AlbumItem album={album} />
                </li>
            ))}
        </ul>
    );
}

export default AlbumList;