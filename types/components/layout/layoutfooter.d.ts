declare namespace LayoutFooter {
  /**
   * Footer link item interface
   */
  export interface FooterLink {
    key: string
    href: string
    isExternal?: boolean
    isRawText?: boolean
    onClick?: (e: Event) => void
  }

  /**
   * Footer link section interface
   */
  export interface FooterSection {
    title: string
    links: FooterLink[]
  }

  /**
   * Friend link interface
   */
  export interface FriendLink {
    name: string
    url: string
  }

  /**
   * Social media link interface
   */
  export interface SocialLink {
    icon: string
    href: string
    label: string
  }
}

export = LayoutFooter
export as namespace LayoutFooter;
