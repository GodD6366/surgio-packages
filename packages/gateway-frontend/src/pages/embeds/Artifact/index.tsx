import { Loader2 } from 'lucide-react'
import React from 'react'
import { ArtifactConfig } from '@daichangchun/surgio/internal'
import useSWR from 'swr'
import { useParams, useLocation } from 'react-router-dom'
import ArtifactCard from '@/components/ArtifactCard'
import { defaultFetcher } from '@/libs/utils'

const Page: React.FC = () => {
  const { artifactName } = useParams<{ artifactName: string }>()
  const location = useLocation()
  const artifactParams = new URLSearchParams(location.search)
  const { data: artifact, error } = useSWR<ArtifactConfig>(
    `/api/artifacts/${artifactName}`,
    defaultFetcher
  )

  ;['dl', 'access_token'].forEach((key) => {
    artifactParams.delete(key)
  })

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center bg-white dark:bg-gray-800">
      {error ? (
        <div className="text-2xl font-semibold">🚨 加载失败 🚨</div>
      ) : null}

      {artifact ? (
        <ArtifactCard
          artifact={artifact}
          isEmbed
          artifactParams={artifactParams}
        />
      ) : (
        <div className="flex justify-center items-center text-lg">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          加载中...
        </div>
      )}
    </div>
  )
}

export default Page
