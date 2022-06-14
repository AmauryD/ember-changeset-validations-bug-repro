import Component from '@glimmer/component';
import { Changeset } from 'ember-changeset';
import { validatePresence } from 'ember-changeset-validations/validators';
import lookupValidator from 'ember-changeset-validations';
import { action } from '@ember/object';

const validator = {
  title: [validatePresence(true)],
  content: [validatePresence(true)],
  comments: [
    (e) => {
      /**
       * Validates only when array is changed
       */
      console.log(e);
      return true;
    },
  ],
  // not working
  'comments.0.content': [
    (e) => {
      console.log(e);
      return true;
    },
  ],
};

export default class FormComponent extends Component {
  changeset;

  constructor(owner, args) {
    super(owner, args);
    this.changeset = Changeset(
      {
        title: 'Article',
        content: 'Article content',
        comments: [
          {
            content: 'That was fun',
          },
          {
            content: 'That was not fun',
          },
        ],
      },
      lookupValidator(validator),
      validator
    );
  }

  @action
  setValue(key, e) {
    console.log(key, e.target.value);
    this.changeset.set(key, e.target.value);
    this.changeset.get(key);
  }

  @action
  newComment() {
    const currentComments = this.changeset.get('comments');
    this.changeset.set('comments', [
      ...currentComments,
      {
        content: currentComments.length.toString(),
      },
    ]);
  }

  /**
   * Rollback does not work on inner objet of comments
   */
  @action
  rollback() {
    this.changeset.rollback();
  }
}
