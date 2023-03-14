import { useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function HorizontalCollapse(props) {
  const { children, isOpen, ...kv } = props;
  const [hidden, setHidden] = useState(!isOpen);

  return (
      <motion.div
        hidden={hidden}
        initial={false}
        onAnimationStart={() => setHidden(false)}
        onAnimationComplete={() => setHidden(!isOpen)}
        animate={{ width: isOpen ? 300 : 0 }}
        style={{
          background: "white",
          whiteSpace: 'nowrap',
          overflow: 'none',
          height: "100%",
        }}
      >
      {children}
      </motion.div>
  );
}