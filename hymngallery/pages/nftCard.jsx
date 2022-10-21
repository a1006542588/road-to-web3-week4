import { useEffect,useState } from 'react'

export const NFTCard = ({ nft }) => {
    const [isVideo, setIsVideo] = useState(false);
    const filename = nft.media[0].gateway;
    const filetype = filename.split('.').pop().toLowerCase();

    useEffect(() => {
        if (filetype == "mp4" || filetype == "avi" || filetype == "rm" || filetype == "mov") {
            setIsVideo(true);
        }
    },[]);
    
    return (
        <div className="flex justify-center gap-x-2 p-4">
            <div className="w-80">
                {
                    isVideo ? (
                        <embed className="object-cover w-80 h-80 shadow-lg border-4 border-solid rounded-3xl" src={nft.media[0].gateway}></embed>
                    ) : (
                        <img className="object-cover w-80 h-80 shadow-lg border-4 border-solid rounded-3xl" src={nft.media[0].gateway} ></img>
                    )
                }
            </div>
            <div className="flex flex-col gap-10 px-2 py-3 bg-sky-600 shadow-lg border-4 border-solid rounded-3xl">
                    <h2 className="text-xl text-yellow-600 w-650px text-center font-bold">{nft.title}</h2>
                    <div className="flex w-650px">
                        <h3 className="text-white">ID:&nbsp;&nbsp;</h3> 
                        <h3>{nft.id.tokenId}</h3>
                    </div>
                    <div className="flex w-650px" >
                        <h3 className="text-white">Address:&nbsp;&nbsp;</h3> 
                        <h3>{nft.contract.address}</h3>
                    </div>
                    <div className="flex justify-start">
                        <div className="text-white">Description:&nbsp;&nbsp;</div>
                        {nft.description ? (<textarea className="w-80 h-20 overflow-clip overflow-y-auto">{nft.description}</textarea>):(<div>None</div>)} 
                    </div>
            </div>
        </div>
    )
}