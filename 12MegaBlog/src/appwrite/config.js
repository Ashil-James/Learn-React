import conf from '../conf/conf.js';
import {Client, ID,Storage, Query,TablesDB} from "appwrite";

export class Service {
    client = new Client();
    tablesDB;
    bucket;
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        
        this.tablesDB = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.tablesDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data:{
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }   
            })
        } catch (error) {
            console.error("Appwrite Error :: createPost", error)
        }
    }

    async updatePost(slug, {title, content, featuredImage, status})
    {
        try {
            return await this.tablesDB.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status
                }
            })
        } catch (error) {
            console.error("Appwrite Error :: updatePost Error:: ", error)

        }
    }

    async deletePost(slug){
        try {
            await this.tablesDB.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug
            })

            return true
        } catch (error) {
            console.error("Appwrite Error :: DeletePost Error:: ", error)
            return false
        }
    }

    async getPost(slug)
    {
        try {
            return await this.tablesDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug
            })
        } catch (error) {
            console.error("Appwrite Error :: getPost Error:: ", error)
        }
    }

    async getPosts(
        queries = [Query.equal("status", "active")]
    )
    {
        try {
            return await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                queries,

            })
        } catch (error) {
            console.error("Appwrite Error :: getPosts Error:: ", error)
            return false;
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file
            })
        } catch (error) {
            console.error("Appwrite Error :: fileUpload Error:: ", error)
            return false
        }
    }

    async deleteFile(fileId){
        try {
                await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId
            })
            return true
        } catch (error) {
            console.error("Appwrite Error :: fileUpload Error:: ", error)
            return false            
        }
    }

    getFileView(fileId)
    {
        if (!fileId) return "";
        return this.bucket.getFileView({

            bucketId: conf.appwriteBucketId,
            fileId
        })
    }
}


const service = new Service()
export default service

