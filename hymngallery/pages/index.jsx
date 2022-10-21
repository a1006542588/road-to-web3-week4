import { NFTCard } from "./nftCard"
import { useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection]=useState(false);
  const [res, setRes]=useState(0);

  const fetchNFTs = async() => {
    let nfts; 
    setRes(1);
    console.log("fetching nfts");
    const api_key = "w_x5mJWVZXBu6smQBNgLdEzQGKEwIz6L"
    const baseURL = `https://polygon-mainnet.g.alchemyapi.io/v2/${api_key}/getNFTs/`;
    var requestOptions = {
        method: 'GET'
      };
     
    if (!collection.length) {
    
      const fetchURL = `${baseURL}?owner=${wallet}`;
  
      nfts = await fetch(fetchURL, requestOptions).then(
        data => {setRes(2); return data.json();}
      )
    } else {
      console.log("fetching nfts for collection owned by address")
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts= await fetch(fetchURL, requestOptions).then(
        data => {setRes(2); return data.json();}
      )
    }
  
    if (nfts) {
      console.log("nfts:", nfts)
      setNFTs(nfts.ownedNfts)
    }
  }
  
  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      setRes(1);
      var requestOptions = {
        method: 'GET'
      };
      const api_key = "w_x5mJWVZXBu6smQBNgLdEzQGKEwIz6L"
      const baseURL = `https://polygon-mainnet.g.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => {setRes(2); return data.json();})
      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      }
    }
  }

  return (
    <div className="flex flex-col py-8 gap-y-3 bg-[url('/back.jpg')] bg-cover bg-no-repeat w-full h-screen">
      <div className="flex justify-between">
        <div className="flex flex-col justify-center items-center">
        {
          (wallet || collection) ? ( 
            NFTs.length ? (
              <div className="absolute left-[140px] top-[80px]">
                <h1 className="text-white font-bold transform -skew-y-20 -skew-x-12 text-6xl">My Collections</h1>
                <h2 className="text-white font-bold transform -skew-y-20 -skew-x-12 text-4xl">Have {NFTs.length} NFTs</h2>
              </div>
              ) : ( res == 1 ? (
                    <div className="absolute left-[240px] top-[100px]">
                      <h2 className="text-white font-bold transform -skew-y-20 -skew-x-12 text-4xl"> Waiting... </h2>
                    </div>
                  ) : ( res == 2 ? (
                      <div className="absolute left-[180px] top-[100px]">
                        <h2 className="text-white font-bold transform -skew-y-20 -skew-x-12 text-4xl">No NFT to show</h2>
                      </div>
                      ) : (
                        <div className="hidden"></div>
                      )
                  )
                )
          ) : (
            <div className="hidden"></div>
          )
        }
        </div>
        <div className="flex flex-col justify-center items-center gap-y-4 top-[60px] right-[60px] absolute">
          <input className="border-4 border-indigo-500/75 w-80 rounded-xl" disabled={fetchForCollection} type={"text"} onChange={(e)=>{setWalletAddress(e.target.value);setCollectionAddress("");}} value={wallet} placeholder="Input your wallet address"></input>
          <input className="border-4 border-indigo-500/75 w-80 rounded-xl" disabled={!fetchForCollection} type={"text"} onChange={(e)=>{setCollectionAddress(e.target.value);setWalletAddress("");}} value={collection} placeholder="Add the collection address"></input>
          <label className="text-green-600 font-semibold"><input onChange={(e)=>{setFetchForCollection(e.target.checked)}} type={"checkbox"} className="mr-2"></input>Fetch for collection</label>
          <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-full w-40 font-bold shadow-inner bottom-2 border-solid"} 
            onClick={ () => {
              if (fetchForCollection) {
                fetchNFTsForCollection()
              } else {
                fetchNFTs()
              }
            }
          }> Show NFTs </button>
        </div>
      </div>
      
      <div className="flex flex-col justify-start gap-y-12 mt-4 gap-x-2 absolute bottom-[20px] left-[50px]">
      {
        
        NFTs.length ? ( 
          <div className="flex m-4">
            <InfiniteScroll
              dataLength={100}
              height={500}
            > 
              { 
                NFTs.map(nft => {
                  return (
                    <NFTCard nft={nft}></NFTCard>          
                  )
                })
              }
            </InfiniteScroll>
          </div> 
        ) : ( 
          <div className="hidden"></div>
        )
      }
      </div>
    </div>
  )
}

export default Home