<template>
  <div class="">
    <div class="w-full">
      <ul class="menu menu-horizontal w-full">
        <div class="flex justify-center items-center gap-2 text-sm text-center w-full">
          <NuxtLink
            to="https://github.com/TomatoDroid/scaffold-eth-vue"
            target="_blank"
            class="link"
          >
            Fork me
          </NuxtLink>
          <span>·</span>
          <div class="flex justify-center items-center gap-2">
            <p>
              Built with
              <Icon name="i-uil-heart" class="inline-block w-4 h-4" />
              at
            </p>
            <NuxtLink
              to="https://buidlguidl.com/"
              target="_blank"
            >
              <Icon name="my-icon:buildl-guidl-logo" class="inline-block w-3 h-5 pb-1 mr-1" />
              <span class="link">BuidlGuidl</span>
            </NuxtLink>
          </div>
          <span>·</span>
          <div className="text-center">
            <a href="https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA" target="_blank" rel="noreferrer" className="link">
              Support
            </a>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>
