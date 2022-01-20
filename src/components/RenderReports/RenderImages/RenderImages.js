import React from 'react';
import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import './RenderImages.css'
import './RenderImages.scss'
const RenderImages=(props)=>{
        let Images=[];
        Images.push({original:props.report.media,thumbnail:props.report.media})
                    return<>
                     <div className="ImageGallery">
                        <ImageGallery 
                        infinite={true}
                        lazyLoad={true}
                        originalClass="Images"
                        useBrowserFullscreen={true}
                        showPlayButton={false}
                        showIndex={false}
                        showFullscreenButton={true}
                        showThumbnails={false}
                        items={Images} />
                        </div>
                        </>
             
}
export default RenderImages;


// ==================For more than one image=========//
// function importAll(r) {
//     return r.keys().map(r);
// }

// const fetchimages = importAll(require.context(props.iv, true, /\.(png|jpe?g|svg|jpg)$/));
// let Images=[]
// for(let i=0;i<fetchimages.length;i++){
//     Images.push({original:fetchimages[i],thumbnail:fetchimages[i]})
// }

    // return <ImageGallery 
    // useTranslate3D={true}
    // showBullets={true}
    // showIndex={true}
    // thumbnailPosition="left"
    // originalClass="images"
    // sizes="300px"
    // items={props.iv} />;