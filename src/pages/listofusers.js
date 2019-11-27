import React, { useEffect, useState } from 'react';
import api from '../services/api'
import '../Listofusers.css'


const urlDefault = 'https://jsonplaceholder.typicode.com/'

export default function () {
    const [users, setUsers] = useState([])



    useEffect(() => {
        async function loadUsers() {
            const responseUsers = await api({url: urlDefault}).get('users', {})
            const responsePhotos = await api({url: urlDefault}).get('photos', {})
            const responsePosts = await api({url: urlDefault}).get('posts', {})
            const responseAlbums = await api({url: urlDefault}).get('albums', {})        

            getPosts(responseUsers.data, responsePosts.data)
            getAlbums(responseUsers.data, responseAlbums.data)
            getPhotos(responseAlbums.data, responsePhotos.data, responseUsers.data)
            getMocks(responseUsers.data)
            
            console.log(responseUsers.data)
            setUsers(responseUsers.data)
        }

        loadUsers()

    }, [])

    function getMocks(responseUsers){
        getMockWeekDays(responseUsers)
        getMockRideInGroup(responseUsers)
    }

    function getMockWeekDays (responseUsers){

    }

    function getMockRideInGroup(responseUsers){
        
    }
    function getPosts (responseUsers, responsePosts){
        responseUsers.forEach(element => {
            const id = element.id
            const funcPost = post => id === post.userId
            element.posts = responsePosts.filter(funcPost)
        })
    }

   
    function getAlbums (responseUsers, responseAlbums){
        
        responseUsers.forEach(element => {
            const id = element.id
            const funcAlbum = album => id === album.userId
            element.albums = responseAlbums.filter(funcAlbum)
        })
    }

    function getPhotos(responseAlbums, responsePhotos, responseUsers){
        responseAlbums.forEach(element => {
            const id = element.id
            const funcPhoto = photo => id === photo.albumId
            element.photos = responsePhotos.filter(funcPhoto)
            
        })

        responseUsers.forEach(element =>{
            const id = element.id
            
            const funcAlbum = function (album){
                if (id === album.userId){
                    return album.photos
                }
            }
            element.photos = responseAlbums.filter(funcAlbum)
        })
        
    }

    return (
        <div className="main-container">
            <h1>Tah bala {users.length}</h1>
            <span className="span-table">
                <span className="span-table-title">
                    <div>Username</div>
                    <div>Name</div>
                    <div>Email</div>
                    <div>City</div>
                    <div>Posts</div>
                    <div>Albums</div>
                    <div>Photos</div>
                </span>
                    {users.map((user) =>
                        <div key={user.id}>
                            {user.name} 
                            {user.username}
                            {user.email}
                            {user.address.city}
                            {user.posts.length}
                            {user.albums.length}
                            {user.photos.length}
                           
                            
                        </div>
                    )}
            </span>

        </div>
        )
}