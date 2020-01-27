export default class CommentModel {
  constructor(data) {
    this.id = data[`id`];
    this.author = data[`author`];
    this.comment = data[`comment`];
    // this.emotion = data[`emotion`];
    this.emotion = 'smile';
    this.date = data[`date`] ? new Date(data[`date`]) : null;
  }

  toRAW() {
    return {
      'id': this.id,
      'author': this.author,
      'comment': this.comment,
      'emotion': this.emotion,
      'date': this.date ? this.date.toISOString() : null,
    };
  }

  static parseComment(data) {
    return new CommentModel(data);
  }

  static parseComments(data) {
    return data.map(CommentModel.parseComment);
  }

  static clone(data) {
    return new CommentModel(data.toRAW());
  }
}
