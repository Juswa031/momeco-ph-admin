<script>
export default {
    name: 'UploadFileComponent',
    props: {
        imageUrl: {
            type: String,
            default: null
        }
    },
    watch: {
        imageUrl: {
            immediate: true,
            handler(newVal) {
                if (newVal) {
                    this.uploadedFileName = newVal.split('/').pop(); // Extract file name from URL
                    this.url = newVal; // Set the URL to the uploaded image URL
                    this.uploadedFile = newVal
                }
            }
        }
    },
    data() {
        return {
            uploadedFileName: null,
            uploadedFile: null,
            url: null,
            progress: 0, // Progress of the upload
        };
    },
    methods: {
        uploadFile() {
            this.$refs.fileInput.click();
        },
        handleFileChange(event) {
            const file = event.target.files[0]; 
            if (file) {
                this.uploadedFile = file;
                this.uploadedFileName = file.name;
            }
            this.uploadImage(file);
        },
        viewUploaded() {
            if (this.uploadedFile) {
                if(!this.imageUrl) {
                    const fileURL = URL.createObjectURL(this.uploadedFile);
                    window.open(fileURL, '_blank');
                } else {
                    window.open(this.uploadedFile, '_blank');
                }
            }
        },
        removeUploadedFile() {
            this.removeImage();
            this.$refs.fileInput.value = ''; 
            this.uploadedFile = null;
            this.uploadedFileName = null;
            this.progress = 0; // Reset progress
        },
        async uploadImage(file) {
            const imageFile = file;
            if (!imageFile) return;

            const formData = new FormData();
            formData.append('file', imageFile);

            try {
                // Initiate the image upload with the progress tracking
                await this.$store.dispatch('UPLOAD_IMAGE', formData, {
                    onUploadProgress: function (progressEvent) {
                        if (progressEvent.lengthComputable) {
                            this.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            console.log(this.progress);
                        }
                    }
                }).then((response) => {
                    this.url = response.data.url;
                    this.$emit('imageUploaded', this.url); // Emit the URL of the uploaded image
                    this.progress = 100; // Set progress to 100% after successful upload
                });
            } catch (error) {
                console.error('Upload failed:', error);
            }
        },
        async removeImage() {
            let payload = {
                url: this.url
            };
            await this.$store.dispatch('DELETE_IMAGE', payload).then((response) => {
                // handle any required logic after deletion
            });
        }
    }
}
</script>

<template>
    <div class="card rounded-2 shadow-sm">
        <div class="p-3">
            <input 
                type="file" 
                accept="image/*" 
                hidden 
                ref="fileInput" 
                @change="handleFileChange($event)"
            />
            <div class="d-flex flex-wrap gap-1 align-items-center justify-content-between">
                <div class="col-11">
                    <div class="d-flex flex-wrap gap-1">
                        <div class="col-6">
                            <div class="d-flex align-items-center gap-1">
                                <h3 v-if="!uploadedFileName" class="g-heading-3 primary-text mb-0 cursor-pointer" @click="uploadFile">Select File</h3>
                                <span v-if="!uploadedFileName">to upload</span>

                                <span v-if="uploadedFileName" class="primary-text cursor-pointer text-truncate" @click="viewUploaded()">{{ uploadedFileName }}</span> <!-- Show uploaded file name -->
                            </div>
                        </div>
                        <div class="col-auto">
                            <p class="r-paragraph-small mb-0 text-gray">Supported file types include .jpg, .png, .jpeg, .webp</p>
                        </div>
                    </div>
                </div>
                <div class="col-auto" v-if="uploadedFile">
                    <i class="isax isax-trash cursor-pointer text-gray primary-hover" @click="removeUploadedFile()"></i>
                </div>
            </div>
        </div>

        <!-- Progress Bar -->
        <div class="progress mt-3">
            <div 
                class="progress-bar" 
                role="progressbar" 
                :style="{ width: progress + '%' }" 
                :aria-valuenow="progress" 
                aria-valuemin="0" 
                aria-valuemax="100"
            >
            </div>
        </div>
        
    </div>
</template>
