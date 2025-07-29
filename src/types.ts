import { ShaderNodeObject, UniformNode } from 'three/webgpu'

export interface GlobalUniforms {
  time: ShaderNodeObject<UniformNode<number>>
}