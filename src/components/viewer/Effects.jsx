import React from 'react'
import { EffectComposer, Bloom, Vignette, ToneMapping, ChromaticAberration } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'

export default function Effects({ isNight }) {
  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={isNight ? 0.4 : 0.06}
        luminanceThreshold={isNight ? 0.4 : 0.92}
        luminanceSmoothing={0.85}
        mipmapBlur
        radius={0.6}
        tintIntensity={isNight ? 0.8 : 0}
      />
      <Vignette
        offset={0.35}
        darkness={isNight ? 0.55 : 0.25}
      />
      <ChromaticAberration offset={[0.00035, 0.00035]} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  )
}
