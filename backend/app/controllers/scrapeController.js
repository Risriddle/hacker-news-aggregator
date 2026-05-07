const cheerio=require('cheerio');
const axios=require('axios');
const Story=require('../models/storyModel')
const url="https://news.ycombinator.com/"


exports.scrape=async(req,res)=>{
       try{
        const {data}=await axios(url);
        const $=cheerio.load(data)
        
        $('tr.athing').each(async(i,el)=>{
            const anchor=$(el).find(".titleline > a")
            const subtext=$(el).next().find('.subtext')
            const score=subtext.find('.score').text()
            const author=subtext.find('.hnuser').text()
            const time=subtext.find('.age').text()
            const title=anchor.text()
            const link=anchor.attr("href")

            await Story.create(
                {
                    title:title,
                    url:link,
                    author:author,
                    score:score,
                    postedAt:time

                }
            )
            
        })
        
        return res.json({result:"Stories added to db!"})
       }
       catch(error){
        console.log("error scraping the site!",error)
       }
}