<template>
    <footer id="footer">
        <div id="headerLink">
            <a  href="#header" v-smooth-scroll >Header</a>
            <router-link class="routerElement" to="/">Home</router-link>
            <router-link class="routerElement" to="/about">About</router-link>
        </div>
        <div id="contactLink">
            <a href=""><img src="@/assets/gmailLink.png"></a>
            <a href=""><img src="@/assets/facebookLink.png"></a>
            <a href=""><img src="@/assets/linkedinLink.png"></a>
            <a href=""><img src="@/assets/githubLink.png"></a>
        </div>
    </footer>
</template>

<script>

</script>
<style scoped>

footer {
    height: 160px;
    background-color: #28355C;
}

footer #headerLink {
    height:60% ;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Montserrat;
    font-weight: 400;
    font-size: 18px;
    
    
}

footer #headerLink a{
    color: white;
    text-decoration: none;
    opacity: 0.75;
    margin: 0px 20px 0px 20px;
}

footer #headerLink a:hover{
    opacity: 1;
}

footer #contactLink {
    
    display: flex;
    align-items: center;
    justify-content: center;
}

footer #contactLink a {
    width: 40px;
    height: 40px;
    margin:0px 20px 0px 20px;
    border:solid 1px  white;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity:0.75;
    transition: opacity 200ms;
}

footer #contactLink a:hover {
    opacity:1;
    
}

footer #contactLink a img{
    width: 16px;
    height: 16px;
}


</style>