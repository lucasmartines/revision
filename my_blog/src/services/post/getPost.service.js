import firebase from '../../firebase.config'


export default  () => {
    return firebase.firestore().collection("posts").get()
}
