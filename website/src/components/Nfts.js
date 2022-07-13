import { motion, AnimatePresence } from "framer-motion"

export const Nfts = ({ isVisible }) => (
    <AnimatePresence>
        {isVisible && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />
        )}
    </AnimatePresence>
)