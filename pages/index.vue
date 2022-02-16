<template>
  <PlayList :plays=plays />
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData(context){
    const res = await context.$axios.get('/play');
    return { plays: res.data }
  },
  data(){
    return{
      plays: []
    }
  }
}
</script>
