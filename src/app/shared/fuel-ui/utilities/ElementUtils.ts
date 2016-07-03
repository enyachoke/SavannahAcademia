import {AnimationUtils} from './AnimationUtils';

export class ElementUtils {
  static outerHeight(el: Element): number {
    let height = el.clientHeight;
    let style = getComputedStyle(el);
    let radix = 10;
    height += parseInt(style.marginTop, radix) + parseInt(style.marginBottom, radix);
    height += parseInt(style.borderTopWidth, radix) + parseInt(style.borderBottomWidth, radix);
    return height;
  }

  static outerWidth(el: Element): number {
    let width = el.clientWidth;
    let style = getComputedStyle(el);
    let radix = 10;
    width += parseInt(style.marginLeft, radix) + parseInt(style.marginRight, radix);
    width += parseInt(style.borderLeftWidth, radix) + parseInt(style.borderRightWidth, radix);
    return width;
  }

  static scrollTo(element: HTMLElement, to: number, duration: number): Promise<any> {
    if (duration <= 0) return;

    let startTime = new Date().getTime();
    let from = element.scrollTop;

    return new Promise<any>((resolve, reject) => {
      let timer = setInterval(() => {
        let time = new Date().getTime() - startTime;
        let scrollTo = AnimationUtils.easeInOutQuart(time, from, to - from, duration);

        element.scrollTop = scrollTo;
        if (time >= duration) {
          element.scrollTop = to;
          clearInterval(timer);
          resolve();
        }
      }, 1000 / 60);
    });
  }
}
