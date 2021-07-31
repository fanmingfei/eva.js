import { addKTXStragetyAndRegister, addPreProcessResourceHandler } from "./fix/loader";
import { Application, BaseTexture, glCore, Texture } from "pixi.js";
import { GLTextureMixin } from "./fix/GLTextureMixin";
import { TextureMixin } from "./fix/TextureMixin";
import { BaseTextureMixin } from "./fix/BaseTextureMixin";
import { resource } from "@eva/eva.js";

addPreProcessResourceHandler(resource);
addKTXStragetyAndRegister();

Object.assign(glCore.GLTexture.prototype, GLTextureMixin);
Object.assign(Texture, TextureMixin);
Object.assign(BaseTexture, BaseTextureMixin);

export function activeCompressedTextureAbilityOnRenderer(application: Application) {
  try {
    const gl = (application.renderer as any).gl as WebGLRenderingContext;
    gl.getExtension('WEBGL_compressed_texture_s3tc');
    gl.getExtension('WEBGL_compressed_texture_s3tc_srgb'); /* eslint-disable-line camelcase */
    gl.getExtension('WEBGL_compressed_texture_etc');
    gl.getExtension('WEBGL_compressed_texture_etc1');
    gl.getExtension('WEBGL_compressed_texture_pvrtc');
    gl.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc');
    gl.getExtension('WEBGL_compressed_texture_atc');
    gl.getExtension('WEBGL_compressed_texture_astc');
  } catch (e) {
    console.error('Compressed texture ability failure ! The message is :', e.message);
  }
}