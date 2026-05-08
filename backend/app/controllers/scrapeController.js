const cheerio=require('cheerio');
const axios=require('axios');
const Story=require('../models/storyModel')
const url="https://news.ycombinator.com/"


exports.scrape=async(req,res)=>{
       try{
        const {data}=await axios(url);
        const $=cheerio.load(data)
        
        const rows=$('tr.athing').slice(0,10)
        for(const el of rows){
            const anchor=$(el).find(".titleline > a")
            const subtext=$(el).next().find('.subtext')
            const score=subtext.find('.score').text()
            const author=subtext.find('.hnuser').text()
            const time=subtext.find('.age').text()
            const title=anchor.text()
            const link=anchor.attr("href")

            const sc=score.split(" ")[0];

            const exists=await Story.findOne({url:link})
            
            if(exists){
                 await Story.findOneAndUpdate(
                      { url: link },
                        {
                            title,
                            author,
                            score: sc,
                            postedAt: time,
                            bookmarked:exists.bookmarked
                        },
                        {
                            upsert: true,
                            new: true
                        })
            }
            else{
            await Story.create(
                            {
                                title:title,
                                url:link,
                                author:author,
                                score:sc,
                                postedAt:time

                            }
                        )
                        }
            
        }
        
        return res.json({result:"top 10 Stories added to db!"})
       }
       catch(error){
        console.log("error scraping the site!",error)
        return res.status(500).json({message:"error scraping site!"})
       }
}