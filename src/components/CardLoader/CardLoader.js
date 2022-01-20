import React from 'react'
import ContentLoader from 'react-content-loader'

const CardLoader = props => {
 const array =[1,2,3,4,5,6,7,8,9];
    const LoaderStyle={
      padding:"10px",
        border: "1px solid rgb(191,198, 204) ",
        width: "600px",
        paddingBottom:"40px",
        maxHeight:"max-content",
        backgroundColor: "white",
        margin:"0px 0px 25px 400px"
    }
    return(
    array.map((e)=>{
        return<React.Fragment key={e}>
            <ContentLoader
              viewBox="0 0 400 400"
              style={LoaderStyle}
              foregroundColor={"rgb(155, 155, 155)"}
              speed={2}
              {...props}
            >
              <circle cx="20" cy="20" r="17" />
              <rect x="50" y="10" rx="5" ry="5" width="100" height="8" />
              <rect x="155" y="10" rx="5" ry="5" width="120" height="8" />
              <rect x="68" y="28" rx="5" ry="5" width="50" height="5" />
              <rect x="120" y="28" rx="5" ry="5" width="50" height="5" />
              <rect x="172" y="28" rx="5" ry="5" width="50" height="5" />
              <rect x="320" y="10" rx="5" ry="5" width="80" height="20" />
              <circle cx="57" cy="30" r="7" />
              <rect x="0" y="55" rx="5" ry="5" width="400" height="250" />
              <rect x="0" y="320"  rx="5"  ry="5" width="400" height="8" />
              <rect x="0"  y="340" rx="5" ry="5" width="400" height="8" />
              <rect x="0" y="360" rx="5" ry="5" width="400" height="8" />
              <rect x="0" y="380" rx="5" ry="5" width="400" height="8" />
                      </ContentLoader>
         </React.Fragment >
   

        })
    )
        }
  

export default CardLoader;