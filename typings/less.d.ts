declare module "*.less" {
    // const styles: { [className: string]: undefined | string };
    const styles: (...args: Array<false | string | undefined | {[className: string ]: undefined | string | boolean}>) => string ;
    export default styles;

}