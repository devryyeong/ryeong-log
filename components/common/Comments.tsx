import Giscus from "@giscus/react";
import React from 'react'

const Comments = () => {
  return (
    <section>
      <div className="max-w-5xl mx-auto my-6 px-2">
        <Giscus
          repo="devryyeong/ryeong-log"
          repoId="R_kgDOKARJAQ"
          category="giscus"
          categoryId="DIC_kwDOKARJAc4CZ58c"
          mapping="pathname"
          strict="1"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="noborder_light"
          lang="ko"
          loading="lazy"
        />
      </div>
    </section>
  );
}

export default Comments;
