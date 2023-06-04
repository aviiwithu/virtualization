import React, { useEffect, useRef, useState } from 'react'

const VirtualList = ({
    listItemClass="",
    ul_itemClass="",
    list=[],
    threshold=2,
    gap=0
}) => {

    const [listToRender, setListToRender]=useState({start:0, end:1});
    const [elHeigt, setElHeight]=useState(0);
    const parentContainerRef=useRef(null);
    
    const calcListToRender=function(e){
        const containerHeight=parentContainerRef.current.parentElement.offsetHeight;
        const scrollTop=parentContainerRef.current.parentElement.scrollTop;
        const startIndex=Math.max(0, Math.floor(scrollTop/elHeigt)-threshold);
        const endIndex=Math.min(list.length-1, Math.ceil((scrollTop+containerHeight)/elHeigt+threshold));
        setListToRender({
            start:startIndex,
            end:endIndex
        })
        console.log({
            startIndex,
            endIndex
        })
    }

    useEffect(function(){
        const timeout=setTimeout(function(){
            const childElement=parentContainerRef.current?.children[0];
            const elHeight=childElement.offsetHeight+(2*gap);
            setElHeight(elHeight);
            parentContainerRef.current?.setAttribute('style', `height:${elHeight*list.length}px`);
            calcListToRender();
            clearTimeout(timeout);
        })
    },[]);


    return <ul ref={parentContainerRef} className={ul_itemClass} onWheel={calcListToRender}>
    {
        list
        ?.slice(listToRender.start, listToRender.end)
        .map((item, index)=><li 
            className={listItemClass}
            style={{
                '--gap':`${gap}px`, '--top':`${(listToRender.start+index)*elHeigt}px`
            }}
            key={index}
            >
                {item}

                
        </li>)
    }
</ul>
}

export default VirtualList