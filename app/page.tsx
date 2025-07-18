import { getClientFirebaseConfig } from "@/lib/firebase/config";
import { ClientHomePage } from "@/components/ClientHomePage";

/**
 * Main Home Page Component (Server Component)
 * 
 * This is the main entry point for the biolink application. It loads
 * the Firebase configuration from the generated config (built from YAML at build time)
 * and passes it to the client components.
 * 
 * Features:
 * - Build-time YAML config processing
 * - Firebase Remote Config integration
 * - Modular component architecture
 * - Responsive design
 * - Dark mode support
 * - Interactive animations and effects
 * - Modal management
 * - Accessibility support
 */

export default function Home() {
  // Get Firebase config from generated build-time config
  const firebaseConfig = getClientFirebaseConfig();
  
  return <ClientHomePage firebaseConfig={firebaseConfig} />;
}
