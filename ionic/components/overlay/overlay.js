import {IonicRoot} from '../app/app';
import {Animation} from '../../animations/animation';
import {ClickBlock} from '../../util/click-block';
import * as util from 'ionic/util';


export class Overlay {

  /* Instance Methods */
  open(opts) {
    let animationName = (opts && opts.animation) || this.options.enterAnimation;
    let enterAnimation = Animation.create(this.domElement, animationName);
    enterAnimation.before.addClass('show-overlay');
    ClickBlock(true, enterAnimation.duration() + 200);

    return new Promise(resolve => {
      enterAnimation.play().then(() => {
        ClickBlock(false);
        enterAnimation.dispose();
        resolve();
      });
    });
  }

  close(opts) {
    return new Promise(resolve => {
      let animationName = (opts && opts.animation) || this.options.leaveAnimation;
      let leavingAnimation = Animation.create(this.domElement, animationName);
      leavingAnimation.after.removeClass('show-overlay');
      ClickBlock(true, leavingAnimation.duration() + 200);

      leavingAnimation.play().then(() => {
        this._clean();
        ClickBlock(false);
        leavingAnimation.dispose();
        resolve();
      })
    });
  }

  extendOptions(opts) {
    if (!this.options) this.options = {};
    util.extend(this.options, opts);
  }

  _clean() {
    this._dispose && this._dispose();
  }


  /* Static Methods */
  static create(ComponentType: Type, opts) {
    return new Promise((resolve, reject) => {
      IonicRoot.append(ComponentType).then((ref) => {
        let overlay = ref.instance;
        overlay._dispose = ref.dispose;
        overlay.domElement = ref.elementRef.domElement;
        overlay.extendOptions(opts);
        overlay.open(opts);
        resolve(overlay);

      }).catch(err => {
        console.error('Overlay create:', err);
        reject(err);
      });
    });
  }

}