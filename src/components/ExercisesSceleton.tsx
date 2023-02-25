import React from "react"
import ContentLoader from "react-content-loader"

const ExercisesSceleton = (props: any) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={763}
    viewBox="0 0 400 763"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="26" y="70" rx="0" ry="0" width="333" height="20" /> 
    <rect x="18" y="223" rx="0" ry="0" width="0" height="1" /> 
    <rect x="36" y="125" rx="30" ry="30" width="314" height="49" />
  </ContentLoader>
)

export default ExercisesSceleton