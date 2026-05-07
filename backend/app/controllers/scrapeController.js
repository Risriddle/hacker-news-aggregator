const cheerio=require('cheerio');
const axios=require('axios');

const url="https://news.ycombinator.com/"


exports.scrape=async(req,res)=>{
       try{
        const {data}=await axios(url);
        const $=cheerio.load(data)
        const stories=[]
        $('tr.athing').each((i,el)=>{
            const anchor=$(el).find(".titleline > a")
            const subtext=$(el).next().find('.subtext')
            const score=subtext.find('.score').text()
            const author=subtext.find('.hnuser').text()
            const time=subtext.find('.age').text()
            const title=anchor.text()
            const link=anchor.attr("href")

            stories.push({
                title,link,score,author,time
            })
        })
        // console.log(stories)
        return res.json({result:stories})
       }
       catch(error){
        console.log("error scraping the site!",error)
       }
}