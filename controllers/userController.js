import UserModel from "../model/User.js"
import fetch from "node-fetch";

import dotenv from "dotenv"
dotenv.config()

const token=process.env.Token;

class CourseController{

    static getAllUser=async(req,res)=>
    {
        const data=await UserModel.find() 
        res.send({"status":"success","data":data})
    }

    static addUser=async(req,res)=>{
        const username=req.params.username
        const data=await UserModel.find({"login":username})
        if(data.length!=0)
        {

            res.send({"status":"success","data":data})  
        }
        else
        {
            
            const response = await fetch('https://api.github.com/users/'+username, {
            method: 'get',
            headers: {
                'Authorization': 'Bearer '+token,
                'Content-Type': 'application/json'
            }
             });

            const {
                login,
                id,
                node_id,
                avatar_url,
                gravatar_id,
                url,
                html_url,
                followers_url,
                following_url,
                gists_url,
                starred_url,
                subscriptions_url,
                organizations_url,
                repos_url,
                events_url,
                received_events_url,
                type,
                site_admin,
                name,
                company,
                blog,
                location,
                email,
                hireable,
                bio,
                twitter_username,
                public_repos,
                public_gists,
                followers,
                following,
                created_at,
                updated_at} = await response.json();
             
           const doc=new UserModel({
               login,
                id,
                node_id,
                avatar_url,
                gravatar_id,
                url,
                html_url,
                followers_url,
                following_url,
                gists_url,
                starred_url,
                subscriptions_url,
                organizations_url,
                repos_url,
                events_url,
                received_events_url,
                type,
                site_admin,
                name,
                company,
                blog,
                location,
                email,
                hireable,
                bio,
                twitter_username,
                public_repos,
                public_gists,
                followers,
                following,
                created_at,
                updated_at
           })
            await doc.save()

            res.send({"status":"success","data":login})  

        }
    }

    static searchUser=async(req,res)=>
    {                                   
         const {username, location}=req.query;
         const data=await UserModel.find({"login":username,"location":location}) 
        
        res.send({"status":"success","data":data})
    }

    static deleteUser=async(req,res)=>
    {           
        
      
         const username=req.params.username
         const data=await UserModel.find({"login":username})
         console.log(data); 
         if(data.length!=0){
            const info=await UserModel.deleteOne({"login":username})
            res.send({"status":"success","data":info})
 
         }
         else{
            res.send({"status":"failed","message":"not found","data":data})
         }
        
       
    }


    static updateUser=async(req,res)=>
    {           
         const username=req.params.username
         const data=await UserModel.find({"login":username})
         const newData=req.body;
         if(data.length!=0)
         {
            const info=await UserModel.updateMany({"login":username},{$set: newData})
            res.send({"status":"success","data":info})
         }
         else{
            res.send({"status":"failed","message":"not found","data":data})
         }
        

    }


    static sortUser=async(req,res)=>
    {     
    
        const {public_repos, public_gists,followers,following,created_at}=req.query;
        const data=await UserModel.find().sort({"public_repos":public_repos,
                                                "public_gists":public_gists,
                                                "followers":followers,
                                                "following":following,
                                                "created_at":created_at})
         if(data.length!=0)
         {
            res.send({"status":"success","data":data})
         }
         else{
            res.send({"status":"failed","message":"not found","data":data})
         }
        

    }

    static mutually=async(req,res)=>{
        const username=req.params.username
        const data=await UserModel.find({"login":username}) 
        console.log(data)
        if(data.length!=0)
        {
             const {followers_url}=data[0];
             console.log(followers_url);
           
           
             const response = await fetch(followers_url, {
                method: 'get',
                headers: {
                    'Authorization': 'Bearer '+token,
                    'Content-Type': 'application/json'
                }
                 });

            const info= await response.json();
            res.send({"status":"sucsess","data":info})
                
        }
        else{
            res.send({"status":"failed","message":"not found","data":data})
        }
    }


}

export default CourseController;
