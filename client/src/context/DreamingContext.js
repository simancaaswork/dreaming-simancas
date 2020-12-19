import { createContext, useReducer, useEffect } from 'react'

import axiosClient from '../axios/axios_client'
import axios from 'axios'

export const DreamingContext = createContext()

const DreamingState = ({ children }) => {

    const initialState = {
        /*  user state */
        user: {},
        userOnline: {},
        usersSuggest: [],

        /* posts state */
        posts: [],
        postSolo: {},
        myPost: [],
        postsRelated: [],

        /*  login state */
        login: {},
        layoutLogin: {
            loading: false,
            errorMsg: '',
            errorMsgComponent: false,
            redirectUserLoginSuccess: false
        },

        /*  sign up state */
        register: {},
        layoutRegister: {
            loading: false,
            errorMsgComponent: false,
            errorMsg: '',
            redirectUserCreatedSuccess: false
        },
        
        /*  configuration state */
        configUser: {},
        layoutConfigUser: {
            success: false,
            updating: false,
            alertFillFields: false,
            userAlreadyExists: false
        },

        /*  upload image state */
        uploadImage: {},
        layoutUploadImage: {
            alertUploadingImage: false,
            redirectUploadSuccess: false
        },

        layoutComment: {
            uploadingComment: false
        },

        /* people suggest */
        peopleToSuggest: []
    }
    
    const reducer = (state, action) => {
        switch(action.type) {
            case 'REST_REDIRECT_UPLOAD_IMAGE':
                return {
                    ...state,
                    layoutUploadImage: {
                        alertUploadingImage: false,
                        redirectUploadSuccess: false
                    }
                }
            case 'RESET_REDIRECT_SIGN_UP_SUCCESS':
                return {
                    ...state,
                    layoutRegister: {
                        loading: false,
                        errorMsgComponent: false,
                        errorMsg: '',
                        redirectUserCreatedSuccess: false
                    }
                }
            case 'RESET_LOGIN_ERROR':
                return {
                    ...state,
                    layoutLogin: {
                        loading: false,
                        errorMsg: '',
                        errorMsgComponent: false,
                        redirectUserLoginSuccess: false
                    }
                }
            case 'UPDATE_NOTIFICATIONS':
                return {
                    ...state,
                    userOnline: action.payload
                }
            case 'RESET_LAYOUT_ALERTS':
                return {
                    ...state,
                    layoutConfigUser: {
                        success: false,
                        updating: false,
                        alertFillFields: false,
                        userAlreadyExists: false
                    }
                }
            case 'SET_CONFIG_USER_UPDATING':
                return {
                    ...state,
                    layoutConfigUser: {
                        success: false,
                        updating: true,
                        alertFillFields: false,
                        userAlreadyExists: false
                    }
                }
            case 'USER_CONFIG_UPDATED_SUCCESS':
                return {
                    ...state,
                    userOnline: action.payload,
                    layoutConfigUser: {
                        success: true,
                        updating: false,
                        alertFillFields: false,
                        userAlreadyExists: false
                    }
                }
            case 'USER_FOLLOWED_SUCCESS':
                return {
                    ...state,
                    userOnline: action.payload.userOnline,
                    user: action.payload.user
                }
            case 'UNFOLLOW_USER_SUCCESS': 
                return {
                    ...state,
                    userOnline: action.payload.userOnlineToModifidy,
                    user: action.payload.userToRemoveFollower
                }
            case 'USER_ONLINE_FOLLOWING_REMOVE_UPDATE':
                return {
                    ...state,
                    userOnline: action.payload
                }
            case 'UPDATE_USER_FOLLOWER':
                return {
                    ...state,
                    user: action.payload
                }
            case 'USER_ONLINE_UPDATED_FOLLOWING_LIST':
                return {
                    ...state,
                    userOnline: action.payload
                }
            case 'LOG_OUT_ONLINE':
                return {
                    ...initialState
                }
            case 'GET_POST_ALONE_SUCCESS':
                return {
                    ...state,
                    postSolo: action.payload,
                    postsRelated: action.payload.postsRelated
                }
            case 'GET_USER_INFORMATION_OKAY':
                return {
                    ...state,
                    user: action.payload.user_exists,
                    myPost: action.payload.postsByUser
                }

            /*  comments actions  */
            case 'SET_UPLOADING_COMMENT':
                return {
                    ...state,
                    layoutComment: {
                        uploadingComment: true
                    }
                }
            case 'UPLOAD_COMMENT_SUCCESS': 
                return {
                    ...state,
                    layoutComment: {
                        uploadingComment: false
                    }
                }

            /*  Users suggest */
            case 'GET_USERS_SUGGEST_SUCCESS':
                return {
                    ...state,
                    usersSuggest: action.payload
                }

            /*  Posts actions   */
            case 'GET_POSTS_SUCCESS':
                return {
                    ...state,
                    posts: action.payload
                }
            case 'GET_MY_POST_SUCCESS':
                return {
                    ...state,
                    myPost: action.payload
                }

            /*      Sign in actions     */
            case 'SET_LOADING_SIGN_IN':
                return {
                    ...state,
                    layoutLogin: {
                        loading: true
                    }
                }
            case 'ERROR_SIGN_IN_USER':
                return {
                    ...state,
                    layoutLogin: {
                        loading: false,
                        errorMsg: action.payload,
                        errorMsgComponent: true
                    }
                }
            case 'SIGN_IN_USER_SUCCESS':
                return {
                    ...state,
                    userOnline: action.payload,
                    layoutLogin: {
                        loading: false,
                        errorMsg: '',
                        errorMsgComponent: false,
                        redirectUserLoginSuccess: true
                    }
                }

            /*      Sign up actions     */
            case 'ERROR_SIGN_UP_USER':
                return {
                    ...state,
                    layoutRegister: {
                        errorMsgComponent: true,
                        errorMsg: action.payload,
                        loading: false
                    }
                }
            case 'SET_LOADING_SIGN_UP': 
                return {
                    ...state,
                    layoutRegister: {
                        errorMsgComponent: false,
                        errorMsg: '',
                        loading: true
                    }
                }
            case 'SIGN_UP_USER_SUCCESS':
                return {
                    ...state,
                    userOnline: action.payload,
                    layoutRegister: {
                        errorMsgComponent: false,
                        errorMsg: '',
                        loading: false,
                        redirectUserCreatedSuccess: true
                    }
                }

            /*      upload post actions     */
            case 'SET_UPLOADING_POST_TRUE':
                return {
                    ...state,
                    layoutUploadImage: {
                        alertUploadingImage: true,
                        redirectUploadSuccess: false
                    }
                }
            case 'UPLOAD_IMAGE_SUCCESS':
                return {
                    ...state,
                    layoutUploadImage: {
                        alertUploadingImage: false,
                        redirectUploadSuccess: true
                    },
                    posts: [action.payload, ...state.posts]
                }

            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        if(Object.keys(state.userOnline).length !== 0 && state.posts.length === 0 && state.usersSuggest.length === 0) {
            getPosts()
            getSuggetsUsers()
        }
        
        // eslint-disable-line no-extend-native
    }, [state.userOnline])

    /* users action */
    async function getSuggetsUsers() {
        const { username } = state.userOnline

        const response = await axiosClient.get(`/user/suggest/users/${username}`)
        dispatch({
            type: 'GET_USERS_SUGGEST_SUCCESS',
            payload: response.data.users_suggest
        })
    }

    async function getUserInformation(user) {
        try {
            const response = await axiosClient.get(`/user/information/${user}`)
        
            dispatch({
                type: 'GET_USER_INFORMATION_OKAY',
                payload: response.data
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    async function readedNotification() {
        const { _id } = state.userOnline
        try {

        const response = await axiosClient.put(`/user/update/notification/status/${_id}`)
        dispatch({
            type: 'UPDATE_NOTIFICATIONS',
            payload: response.data.user
        })
            
        } catch (error) {
            console.log(error);
        }
    }

    /*  follow and unfollow functions */
    async function followUser(user) {
        try {
            const { userOnline } = state
            let followingUser = {
                _id: userOnline._id,
                username: userOnline.username,
                name: userOnline.name,
                avatar: userOnline.avatar
            }

            let followerUser = {
                _id: user._id,
                username: user.username,
                name: user.name,
            }
            dispatch({
                type: 'UPDATE_USER_FOLLOWER',
                payload: user
            })

            let data = {
                followingUser,
                followerUser
            }

            const response = await axiosClient.post('/user/follow', data)
            if(response.status === 200) {
                getSuggetsUsers()
                userOnline.following.push(followerUser)
                user.followers.push(followingUser)
                let usersUpdated = {
                    userOnline,
                    user
                }

                dispatch({
                    type: 'USER_FOLLOWED_SUCCESS',
                    payload: usersUpdated
                })
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    async function unfollowUser(id) {

        let { userOnline:userOnlineToModifidy } = state
        let { _id } = state.user

        let { following } = userOnlineToModifidy
        let followingUpdated = following.filter((user) => user._id !== id)
        userOnlineToModifidy.following =followingUpdated
         let data = {
            userOnlineToModifidy,
            _id
         }
        
        try {
            const response = await axiosClient.put('/user/unfollow', data)
            if(response.status === 200) {
                getSuggetsUsers()
                const { userToRemoveFollower } = response.data

                let usersUpdated = {
                    userToRemoveFollower,
                    userOnlineToModifidy
                }
                dispatch({ 
                    type: 'UNFOLLOW_USER_SUCCESS',
                    payload: usersUpdated
                })
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    /*  login and logOut functions */
    async function loggin(data) {
        dispatch({
            type: 'SET_LOADING_SIGN_IN'
        })

        try {
            const response = await axiosClient.post('/login', data)

            dispatch({
                type: 'SIGN_IN_USER_SUCCESS',
                payload: response.data.user_exists
            })
            
        } catch (error) {
            dispatch({
                type: 'ERROR_SIGN_IN_USER',
                payload: error.response.data.msg
            })
        }
    }

    function logOut() {
        dispatch({
            type: 'LOG_OUT_ONLINE'
        })
    }

    function resetLoginError() {
        dispatch({
            type: 'RESET_LOGIN_ERROR'
        })
    }

    /*  signup functions */
    async function signUp(data) {
        dispatch({
            type: 'SET_LOADING_SIGN_UP'
        })
        try {
            const response = await axiosClient.post('/register/create/user', data)
            dispatch({
                type: 'SIGN_UP_USER_SUCCESS',
                payload: response.data.new_user
            })

        } catch (error) {
            
            dispatch({
                type: 'ERROR_SIGN_UP_USER',
                payload: error.response.data.msg
            })
        }
    } 
    function resetRedirectSignUpSuccess() {
        dispatch({
            type: 'RESET_REDIRECT_SIGN_UP_SUCCESS'
        })
    }
    
    /*  profile functions   */

    async function updateProfile(userModified) {

        dispatch({
            type: 'SET_CONFIG_USER_UPDATING'
        })
        const { userOnline } = state
        if(userOnline.avatar !== userModified.avatar) {
            const { avatar } = userModified
            let imageFormat = new FormData();  
                 imageFormat.append('file', avatar)
                 imageFormat.append('upload_preset', 'diconos')
                 const responseCloudinary = await axios.post('https://api.cloudinary.com/v1_1/drcr3grui/image/upload', imageFormat)
                 userModified.avatar = responseCloudinary.data.secure_url
            
        } 

        try {

            const response = await axiosClient.put('/user/edit', userModified)
            if(response.status === 200) {

                dispatch({
                    type: 'USER_CONFIG_UPDATED_SUCCESS',
                    payload: response.data.user_updated
                })

                setTimeout(() => {
                    dispatch({
                        type: 'RESET_LAYOUT_ALERTS'
                    })
                }, 3000)
            }
            
            
        } catch (error) {
            console.log(error)
        }
    }

    /*  post functions  */
    async function getPosts() {
        try {
            const response = await axiosClient.get('/post/all')
            if(response.status === 200) {
                dispatch({
                    type: 'GET_POSTS_SUCCESS',
                    payload: response.data.posts
                })
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    async function uploadPost(data) {
        const { image } = data

        try {

            dispatch({
                type: 'SET_UPLOADING_POST_TRUE'
            })

             let imageFormat = new FormData();  
                 imageFormat.append('file', image)
                 imageFormat.append('upload_preset', 'diconos')
                 const responseCloudinary = await axios.post('https://api.cloudinary.com/v1_1/drcr3grui/image/upload', imageFormat)
                 data.image = responseCloudinary.data.secure_url

            const response = await axiosClient.post('/post/create', data)
            const { post_to_sent } = response.data
            
            if(response.status === 200) {
                dispatch({
                    type: 'UPLOAD_IMAGE_SUCCESS',
                    payload: post_to_sent
                })

                setTimeout(() => {
                    resetRedirectUploadSuccess()
                }, 1000);
            }
            
        } catch (error) {
            console.log(error.response)
        }
    }

    function resetRedirectUploadSuccess() {
        dispatch({
            type: 'REST_REDIRECT_UPLOAD_IMAGE'
        })
    }

    async function commentPost(data) {
        dispatch({ type: 'SET_UPLOADING_COMMENT' })
        try {
            data.user = state.userOnline
            const response = await axiosClient.post('/comment/add', data)
            
            if(response.status === 200) {
                getPosts()
                dispatch({
                    type: 'UPLOAD_COMMENT_SUCCESS'
                })
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    async function getPostSolo(id) {
        try {

            const response = await axiosClient.get(`/post/alone/${id}`)
            dispatch({
                type: 'GET_POST_ALONE_SUCCESS',
                payload: response.data.postAlone
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    async function likePost(post_id) {
        const { userOnline } = state
        const { name, avatar, username, email, _id } = userOnline
        let userLikedPost = {
            name,
            avatar,
            username,
            email,
            _id
        }
        
        let data = {
            post_id,
            userLikedPost
        }

        try {
            await axiosClient.put('/post/like', data)
            getPosts()
            
        } catch (error) {
            console.log(error)
        }
    }

    async function unlikePost(post_id) {
        try {
            const { userOnline } = state
            const { name, avatar, username, email, _id } = userOnline
            let userUnlikePost = {
                name,
                avatar,
                username,
                email,
                _id
            }
            let data = {
                userUnlikePost,
                post_id
            }

            const response = await axiosClient.put('/post/unlike', data)
            if(response.status === 200) {
                getPosts()
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <DreamingContext.Provider
            value={{
                /*  States  */
                configUser: state.configUser,
                layoutConfigUser: state.layoutConfigUser,
                layoutUploadImage: state.layoutUploadImage,
                layoutLogin: state.layoutLogin,
                layoutRegister: state.layoutRegister,
                user: state.user,
                userOnline: state.userOnline,
                posts: state.posts,
                myPost: state.myPost,
                usersSuggest: state.usersSuggest,
                layoutComment: state.layoutComment,
                postSolo: state.postSolo,
                postsRelated: state.postsRelated,

                /*  Functions   */
                signUp,
                loggin,
                resetLoginError,
                resetRedirectSignUpSuccess,
                uploadPost,
                commentPost,
                getUserInformation,
                getPostSolo,
                logOut,
                followUser,
                unfollowUser,
                likePost,
                unlikePost,
                updateProfile,
                readedNotification,
                getSuggetsUsers
            }}
        >
            {children}
        </DreamingContext.Provider>
    )
}

export default DreamingState;
