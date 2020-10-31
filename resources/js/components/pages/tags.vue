<template>
    <div>
       <div>
		<div class="content">
			<div class="container-fluid">
					
				<!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
				<div class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20">
					<p class="_title0">Playlist <Button @click="addModal=true"><Icon type="md-add" />Ajouter un titre</Button></p>

					<div class="_overflow _table_div">
						<table class="_table">
								<!-- TABLE TITLE -->
							<tr>
								<th>ID</th>
								<th>Nom du morceau</th>
								<th>Ajouté le</th>
								<th>Action</th>
							</tr>
								<!-- TABLE TITLE -->


								<!-- ITEMS -->
							<tr v-for="(tag, i) in tags" :key="i" v-if="tags.length">
								<td>{{tag.id}}</td>
								<td class="_table_name">{{tag.tagName}}</td>
								<td>{{tag.created_at | moment("DD-MM-YYYY [à] hh:mm")}}</td>
								<td>
									<Button type="info" size="small" @click="showEditModal(tag, i)">Modifier</Button>
									<Button type="error" size="small" @click="showDeletingModal(tag, i)" :loading="tag.isDeleting">Supprimer</Button>
								</td>
							</tr>
								<!-- ITEMS -->

						</table>
					</div>
				</div>
				<!-- Tag adding modal -->
						<Modal
							v-model="addModal"
							title="Ajout de morceau"
							:mask-closable="false"
							:closable="false"
							>
							<Input v-model="data.tagName" placeholder="Ajouter un morceau"  />

							<div slot="footer">
								<Button type="default" @click="addModal=false">Fermer</Button>
								<Button type="primary" @click="addTag" :disabled="isAdding" :loading="isAdding">{{isAdding ? 'Adding..' : 'Ajouter'}}</Button>
							</div>

						</Modal>
				<!-- Tag editing modal -->
						<Modal
							v-model="editModal"
							title="Modifier un morceau"
							:mask-closable="false"
							:closable="false"
							>
							<Input v-model="editData.tagName" placeholder="Modifier le morceau"  />

							<div slot="footer">
								<Button type="default" @click="editModal=false">Annuler</Button>
								<Button type="primary" @click="editTag" :disabled="isAdding" :loading="isAdding">{{isAdding ? 'Editing..' : 'Modifier'}}</Button>
							</div>

						</Modal>
				<!-- Tag deleting modal confirmation -->
						<Modal v-model="showDeleteModal" width="360">
							<p slot="header" style="color:#f60;text-align:center">
								<Icon type="ios-information-circle"></Icon>
								<span>Confirmation de suppression</span>
							</p>
							<div style="text-align:center">
								<p>Etes-vous certain de vouloir supprimer ce morceau?</p>
								
							</div>
							<div slot="footer">
								<Button type="error" size="large" long :loading="isDeleting" :disabled="isDeleting" @click="deleteTag">Supprimer</Button>
							</div>
    					</Modal>
				 

			</div>
		</div>
	</div>
    </div>
</template>

<script>
export default {
	data(){
		return {
			data: {
				tagName: ''
			},
			addModal : false,
			editModal : false,
			isAdding: false,
			tags: [],
			editData : {
				tagName: ''
			},
			index : -1,
			showDeleteModal: false,
			isDeleting: false,
			deleteItem: {},
			deletingIndex: -1
		}
	},

	methods : {
		async addTag(){
			if(this.data.tagName.trim()=='') return this.e('Champs requis')
			const res = await this.callApi('post', 'app/create_tag', this.data)
			if(res.status==201){
				this.tags.unshift(res.data)
				this.s('Le morceau a bien été ajouté!')
				this.addModal = false
				this.data.tagName = ''
			}else{
				if(res.status==422){
					if(res.data.errors.tagName){
					this.e(res.data.errors.tagName[0])
					}
				}else{
				this.swr()
				}
			}
		},
		async editTag(){
			if(this.editData.tagName.trim()=='') return this.e('Champs requis')
			const res = await this.callApi('post', 'app/edit_tag', this.editData)
			if(res.status==200){
				this.tags[this.index].tagName = this.editData.tagName
				this.s('Le morceau a bien été modifié!')
				this.editModal = false
				}else{
				if(res.status==422){
					if(res.data.errors.tagName){
					this.e(res.data.errors.tagName[0])
					}
				}else{
				this.swr()
				}
			}
		},
		showEditModal(tag, index){
			let obj = {
				id : tag.id,
				tagName : tag.tagName
			}
			this.editData = obj
			this.editModal = true
			this.index = index
		},
		async deleteTag(){
			this.isDeleting = true
			const res = await this.callApi('post', 'app/delete_tag', this.deleteItem)
			if(res.status==200){
				this.tags.splice(this.deletingIndex,1)
				this.s('Le morceau a bien été supprimé!')
			}else{
				this.swr()
			}
			this.isDeleting = false
			this.showDeleteModal = false
		},
		showDeletingModal(tag,i){
			this.deleteItem = tag
			this.deletingIndex = i
			this.showDeleteModal = true
		}
	},

	async created(){
		const res = await this.callApi('get', 'app/get_tags')
			if(res.status==200){
				this.tags = res.data
			}else{
				this.swr()
			}
	}

}
</script>