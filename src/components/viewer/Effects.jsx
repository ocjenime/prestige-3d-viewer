import React from 'react'
import { EffectComposer, Bloom, Vignette, ToneMapping } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'

export default function Effects({ isNight }) {
  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={isNight ? 0.6 : 0.15}
        luminanceThreshold={isNight ? 0.4 : 0.9}
        luminanceSmoothing={0.9}
        mipmapBlur
        radius={0.7}
      />
      <Vignette
        offset={0.3}
        darkness={isNight ? 0.7 : 0.4}
      />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  )
}
