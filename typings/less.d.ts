declare module "*.less" {
    const styles: (...args: Array<undefined | false | string | { [classname: string]: boolean | undefined }>) => string | undefined;
    export default styles;
}