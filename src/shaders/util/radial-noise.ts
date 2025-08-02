import { atan2, Fn, length, mx_noise_float, Node, ShaderNodeObject, vec2 } from 'three/webgpu'
import { globalUniforms } from '~/game-engine'

/** Creates a radial ripple noise effect using UV coords */
const radialNoise = Fn<[ShaderNodeObject<Node>]>(([uv]) => {
  // UVs to polar coordinates
  const centeredUV = uv.sub(vec2(0.5)).mul(2) // Shift UVs to center
  const angle = atan2(centeredUV.y, centeredUV.x) // Polar angle
  const normalizedAngle = angle.div(Math.PI * 2).add(0.5)
  const radius = length(centeredUV) // Distance from center
  const polarUV = vec2(normalizedAngle, radius)

  // Ripple Noise
  const carthNoise = mx_noise_float(uv.mul(8).add(globalUniforms.time.mul(0.25))).add(1).div(2)
  const polarNoise = mx_noise_float(polarUV.mul(16).sub(globalUniforms.time.mul(0.5))).add(1).div(2)
  const noise = polarNoise.add(carthNoise).div(2)

  return noise
})

export default radialNoise