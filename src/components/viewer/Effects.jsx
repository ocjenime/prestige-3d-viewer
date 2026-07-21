import React from 'react'
import { EffectComposer, Bloom, Vignette, ToneMapping, ChromaticAberration } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'

export default function Effects({ isNight }) {
  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={isNight ? 0.5 : 0.08}
        luminanceThreshold={isNight ? 0.35 : 0.92}
        luminanceSmoothing={0.85}
        mipmapBlur
        radius={0.65}
      />
      <Vignette
        offset={0.35}
        darkness={isNight ? 0.6 : 0.3}
      />
      <ChromaticAberration offset={[0.0004, 0.0004]} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  )
}
