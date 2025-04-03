<!--
    Documentation https://tiptap.dev/
    Installation: https://tiptap.dev/installation/vue3
    Extensions: https://tiptap.dev/api/extensions
    Examples: https://tiptap.dev/examples/default (for additional styling and functionalities for rich text)
-->
<script>
    import { Editor, EditorContent } from '@tiptap/vue-3'
    import StarterKit from '@tiptap/starter-kit';
    import TextAlign from '@tiptap/extension-text-align';
    import BulletList from '@tiptap/extension-bullet-list';
    import Document from '@tiptap/extension-document';
    import ListItem from '@tiptap/extension-list-item';
    import OrderedList from '@tiptap/extension-ordered-list';
    import Underline from '@tiptap/extension-underline';
    import Heading from '@tiptap/extension-heading';
    // import HardBreak from '@tiptap/extension-hard-break';

    export default {
        name:'TipTapRichText',
        components: {
            EditorContent,
        },
        props: {
            modelValue: String,
            isEdit: Boolean,
            richtextClass: String,
            editorContentClass: {
                type: String
            }
        },
        data() {
            return {
                editor: null,
                editorContent: '',
                selected_field: true,
                selected_heading: 0,
                format_title: [
                    {
                        level: 0,
                        format: 'Format Text',
                    },
                    {
                        level: 1,
                        format: 'Heading 1'
                    },
                    {
                        level: 2,
                        format: 'Heading 2'
                    },
                    {
                        level: 3,
                        format: 'Sub Heading'
                    },
                    {
                        level: 4,
                        format: 'Body 1'
                    },
                    {
                        level: 5,
                        format: 'Body 2'
                    },
                    {
                        level: 6,
                        format: 'Body 3'
                    },
                ],
                isActive: false,
            }
        },
        emits: ['update:modelValue'],
        watch: {
            isEdit() {
                this.editor.setEditable(this.isEdit)
            },
            modelValue(value) {
                // HTML
                const isSame = this.editor.getHTML() === value
                if (isSame) {
                    return
                }
                    this.editor.commands.setContent(value, false)
            },
        },
        mounted() {
            this.editor = new Editor({
                extensions: [
                    Document,
                    BulletList,
                    OrderedList,
                    ListItem,
                    StarterKit,
                    Underline,
                    Heading.configure({
                        levels: [1, 2, 3, 4, 5, 6],
                    }),
                    TextAlign.configure({
                        types: ['heading', 'paragraph'],
                    }),
                        // HardBreak.extend({
                        //     addKeyboardShortcuts () {
                        //         return {
                        //             Enter: () => this.editor.commands.setHardBreak()
                        //         }
                        //     }
                        // })
                    
                ],
                content: this.modelValue,
                onUpdate: () => {
                    // HTML
                    this.$emit('update:modelValue', this.editor.getHTML())
                },
            })
            this.editor.setEditable(this.isEdit)
        },
        methods: {
            changeHeading(value) {
                this.editor.chain().focus().toggleHeading({ level: parseInt(value) }).run();
            },
            toggleActive(value) {
                this.isActive = !this.isActive;
                this.editor.chain().focus()[value]().run()
            },
        },
        beforeUnmount() {
            this.editor.destroy()
        },
       
        
    }
</script>
<template>
    <div v-if="editor">
        <div class="rounded-3 mt-2 richtext" :class="richtextClass">
            <div class="col-md-12 h-100 d-flex overflow-auto pe-3 pe-md-0 hover-scrollbar-content richtext-tab pb-3" @scroll="handleScroll($event)" v-if="isEdit">
                <div class="ms-2 cursor-pointer pt-3 my-auto">
                    <i class="isax isax-text-italic fs-4 editor-btn" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic')}"></i>
                </div>
                <div class="ms-3 cursor-pointer pt-3 my-auto">
                    <i class="isax isax-text-bold fs-4 editor-btn" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }"></i> 
                </div>
                <div class="ms-3 cursor-pointer pt-3 my-auto">
                    <i class="isax isax-text-underline fs-4 editor-btn" @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }"></i>
                </div>
                <div class="col-2 ms-3 cursor-pointer mt-3" style="width: 135px;">
                    <select class="row shadow-select form-select p-1  gx-0 card-label-title input-text-1 text-truncate" placeholder="Format" v-model="selected_heading" @change="changeHeading(selected_heading)">
                        <option :value="format.level" v-for="format in format_title" :key="format" :disabled="format.level == 0 ? true : false">{{format.format}}</option>
                    </select>
                </div>
                <div class="ms-3 cursor-pointer pt-3 my-auto">
                    <i class="isax isax-textalign-left fs-4 editor-btn" @click="isActive = isActive,editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"></i>
                </div>
                <div class="ms-3 cursor-pointer pt-3 my-auto">
                    <i class="isax isax-textalign-center fs-4 editor-btn" @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"></i>
                </div>
                <div class="ms-3 cursor-pointer pt-3 my-auto">
                    <i class="isax isax-textalign-right fs-4 editor-btn" @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"></i>
                </div>  
               
                <div class="ms-3 cursor-pointer pt-3 my-auto" @click="toggleActive('toggleBulletList')">
                    <i class="bi bi-list-ul fs-4 editor-btn" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"></i>
                </div>
                <div class="ms-3 cursor-pointer pt-3 my-auto" @click="toggleActive('toggleOrderedList')">
                    <i class="bi bi-list-ol fs-4 editor-btn" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"></i>
                </div>
            </div>
            <editor-content class="w-100 d-inline-block input-text-1 px-3 px-1 hover-scrollbar-content mb-3 mt-3" :class="editorContentClass" :editor="editor" readonly @scroll="handleScroll($event)"/>
        </div>
    </div>
</template>
