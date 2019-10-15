// components/note-card/note-card.js
import Note from '../../models/Note'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    note: {
      type: Note,
      default: new Note()
    }
  }
})
