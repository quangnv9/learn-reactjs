import React from 'react';
import PropTypes from 'prop-types';
import AlbumList from './components/AlbumList/index';

AlbumFeature.propTypes = {};

function AlbumFeature() {
    const albums = [
        {
            id: 1,
            name: 'Chill Cùng Rap Việt',
            thumbnailUrl:
                'https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/8/b/e/0/8be0c43a204c819613eec33c57f0dce9.jpg',
        },
        {
            id: 2,
            name: 'V-Pop: 100 Hits Thập Niên',
            thumbnailUrl:
                'https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/0/a/9/e/0a9e43f3bc9346957f2750d2f1c0fb32.jpg',
        },
        {
            id: 3,
            name: 'V-Pop: Hits Quốc Dân',
            thumbnailUrl:
                'https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/3/4/e/9/34e997492621abb23a753de0d8ebd0d9.jpg',
        },
        {
            id: 4,
            name: 'Rap Việt Nghe Là Ghiền',
            thumbnailUrl:
                'https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/c/b/b/d/cbbdfde4559acd3951a894648f543cd0.jpg',
        },
    ];
    return (
        <div>
            <p>Có thể bạn sẽ thích đấy</p>
            <AlbumList albums={albums} />
        </div>
    );
}

export default AlbumFeature;
