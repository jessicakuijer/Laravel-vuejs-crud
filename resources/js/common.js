import Axios from "axios"

export default{
    data(){
        return{

        }
    },
    methods: {
        async callApi(method, url, dataObj ){
            try {
              return await Axios({
                    method: method,
                    url: url,
                    data: dataObj
                });
            } catch (e) {
                return e.response
            }
        },
        i(desc, title="Hey") {
            this.$Notice.info({
                title: title,
                desc: desc
            });
        },
        s(desc, title="Parfait!") {
            this.$Notice.success({
                title: title,
                desc: desc
            });
        },
        w(desc, title="Oups!") {
            this.$Notice.warning({
                title: title,
                desc: desc
            });
        },
        e(desc, title="Oups!") {
            this.$Notice.error({
                title: title,
                desc: desc
            });
        },
        swr(desc="Quelquechose s'est mal produit! Merci d'essayer à nouveau.", title="Oups!") {
            this.$Notice.error({
                title: title,
                desc: desc
            });
        }
    },

    
}