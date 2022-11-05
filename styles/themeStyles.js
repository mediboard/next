export const Button = {
	sizes: {
    sm: {
      fontSize: "12px",
      padding: "16px",
    },
    md: {
      fontSize: "16px",
    },
  },
  variants: {
  	purple: {
  		bg: "purple.400",
      color: "white"
  	},
  	black: {
  		bg: "#1E1E1E",
      color: "white",
      pt:'2px',
      pb:'2px',
      pr: '10px',
      pl: '10px'
  	},
    small: {
      bg: "#1E1E1E",
      color: "white",
      padding:'2px',
      paddingRight: '5px',
      paddingLeft: '5px'
    },
    disabled: {
      bg: "grey",
      color: "white",
      cursor: "not-allowed"
    },
  },
  baseStyle: {
		color: "black",
    borderRadius: 4,
  },
  defaultProps: {
  	size: "md",
  	variant: "purple",
  },
};

export const Card = {
  // The styles all Cards have in common
  baseStyle: {
    display: 'flex',
    flexDirection: 'row',
    background: 'white',
    alignItems: 'center',
    gap: 6
  },
  // Two variants: rounded and smooth
  variants: {
    rounded: {
      padding: 8,
      borderRadius: 10,
      boxShadow: 'xl',
    },
    smooth: {
      padding: 1,
      borderRadius: 10,
      border: '1px solid #cccccc',
      boxShadow: 'lg',
    },
  },
  // The default variant value
  defaultProps: {
    variant: 'smooth',
  },
}

export const Text = {
  baseStyle: {
    align: 'left',
    fontSize: ['12px', '16px'],
    // color: '#444444',
    color: 'black.500',
    //fontFamily: 'Inter, Sans-Serif'
  },
  // Two variants: rounded and smooth
  variants: {
    thick: {
      fontWeight: 'bold'
    },
    normal: {
      fontWeight: 'normal'
    },
    thin: {
      fontWeight: 'thin'
    }
  },
  // The default variant value
  defaultProps: {
    variant: 'thick',
  },
}

export const Heading = {
  baseStyle: {
    textAlign: 'left',
    fontSize: ['14px', '20px'],
    color: 'black'
  },
  variants: {
    thick: {
      fontWeight: 'bold'
    },
    normal: {
      fontWeight: 'normal'
    },
    thin: {
      fontWeight: 'thin'
    }
  },
  defaultProps: {
    variant: 'thick',
  },
}

export const Badge = {
  sizes: {
    sm: {
      fontSize: "12px",
      padding: "16px",
    },
    md: {
      fontSize: "16px",
    },
  },
  baseStyle: {
    colorScheme: 'purple.400',
  },
  variants: {
    solid: {
      variant: 'solid'
    },
    outline: {
      variant: 'outline'
    },
    subtle: {
      variant: 'subtle'
    }
  },
  defaultProps: {
    variant: 'solid'
  }
}
