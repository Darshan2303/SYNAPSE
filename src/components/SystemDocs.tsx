import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { featuresMd, manualMd } from '../docsRaw';

interface SystemDocsProps {
  onBack: () => void;
}

export const SystemDocs: React.FC<SystemDocsProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'versions' | 'manual' | 'features' | 'debugging'>('manual');

  const markdownComponents: any = {
    h1: ({node, ...props}: any) => <h1 className="text-3xl font-bold mb-6 text-hack-primary uppercase border-b border-hack-primary/30 pb-4 shadow-sm" {...props} />,
    h2: ({node, ...props}: any) => <h2 className="text-2xl font-bold mt-10 mb-4 text-white uppercase tracking-wider flex items-center gap-3 before:content-['//'] before:text-hack-primary" {...props} />,
    h3: ({node, ...props}: any) => <h3 className="text-lg text-hack-secondary font-bold mt-8 mb-3" {...props} />,
    h4: ({node, ...props}: any) => <h4 className="text-md text-white font-bold mt-6 mb-2" {...props} />,
    p: ({node, ...props}: any) => <p className="mb-4 text-hack-muted leading-relaxed" {...props} />,
    ul: ({node, ...props}: any) => <ul className="list-none space-y-2 mb-6 ml-2" {...props} />,
    ol: ({node, ...props}: any) => <ol className="list-decimal pl-5 space-y-2 mb-6 ml-2 marker:text-hack-primary text-hack-muted font-mono" {...props} />,
    li: ({node, ...props}: any) => <li className="text-hack-muted relative before:content-['>_'] before:absolute before:-left-6 before:text-hack-primary before:text-xs before:top-1 pl-6 ml-4" {...props} />,
    a: ({node, ...props}: any) => <a className="text-hack-primary hover:text-hack-accent underline decoration-hack-primary/30 underline-offset-4 transition-colors" target="_blank" rel="noreferrer" {...props} />,
    blockquote: ({node, ...props}: any) => <blockquote className="border-l-4 border-hack-primary pl-5 py-2 my-6 bg-hack-primary/5 italic text-gray-300 font-serif" {...props} />,
    code: ({node, className, children, ...props}: any) => {
      const match = /language-(\w+)/.exec(className || '');
      return !className ? (
        <code className="px-1.5 py-0.5 rounded bg-hack-surface text-hack-primary border border-hack-border font-mono text-[0.85em]" {...props}>
          {children}
        </code>
      ) : (
        <div className="relative my-6 group">
          <div className="absolute -top-3 left-4 bg-hack-surface px-2 text-xs font-bold text-hack-primary uppercase tracking-widest border border-hack-border rounded">
            {match?.[1] || 'sh'}
          </div>
          <pre className="p-5 pt-6 bg-[#0a0a0a] border border-hack-border rounded-lg overflow-x-auto text-sm font-mono shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]"><code className={className} {...props}>{children}</code></pre>
        </div>
      );
    },
    table: ({node, ...props}: any) => <div className="overflow-x-auto my-8 border border-hack-border rounded-lg shadow-lg"><table className="w-full text-left border-collapse" {...props} /></div>,
    th: ({node, ...props}: any) => <th className="bg-hack-surface border-b border-hack-border p-4 text-hack-primary font-bold uppercase tracking-wider text-xs whitespace-nowrap" {...props} />,
    td: ({node, ...props}: any) => <td className="border-b border-hack-border/50 p-4 text-hack-muted text-sm whitespace-nowrap" {...props} />,
    hr: ({node, ...props}: any) => <hr className="my-10 border-hack-border/50" {...props} />,
    strong: ({node, ...props}: any) => <strong className="font-bold text-gray-200" {...props} />,
    img: ({node, ...props}: any) => <div className="my-8 rounded-lg overflow-hidden border border-hack-border shadow-[0_0_15px_rgba(0,255,0,0.1)]"><img className="w-full h-auto" {...props} /></div>,
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto bg-hack-bg text-hack-text font-mono z-50 fixed inset-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-hack-border bg-hack-surface shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="text-hack-muted hover:text-hack-primary transition-colors text-sm uppercase tracking-widest border border-hack-border px-3 py-1 bg-hack-bg"
          >
            &lt; Return
          </button>
          <h1 className="text-xl font-bold tracking-widest text-hack-primary uppercase">System Documentation</h1>
        </div>
        <div className="text-xs text-hack-muted">v1.0</div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 border-r border-hack-border bg-hack-surface/50 p-4 flex flex-col gap-2 shrink-0 overflow-y-auto">
          <button 
            onClick={() => setActiveTab('versions')}
            className={`text-left text-sm uppercase tracking-wider p-2 border ${activeTab === 'versions' ? 'border-hack-primary text-hack-primary bg-hack-primary/10' : 'border-transparent text-hack-muted hover:text-hack-text hover:border-hack-border'}`}
          >
            Versions
          </button>
          <button 
            onClick={() => setActiveTab('manual')}
            className={`text-left text-sm uppercase tracking-wider p-2 border ${activeTab === 'manual' ? 'border-hack-primary text-hack-primary bg-hack-primary/10' : 'border-transparent text-hack-muted hover:text-hack-text hover:border-hack-border'}`}
          >
            User Manual
          </button>
          <button 
            onClick={() => setActiveTab('features')}
            className={`text-left text-sm uppercase tracking-wider p-2 border ${activeTab === 'features' ? 'border-hack-primary text-hack-primary bg-hack-primary/10' : 'border-transparent text-hack-muted hover:text-hack-text hover:border-hack-border'}`}
          >
            Features
          </button>
          <button 
            onClick={() => setActiveTab('debugging')}
            className={`text-left text-sm uppercase tracking-wider p-2 border ${activeTab === 'debugging' ? 'border-hack-primary text-hack-primary bg-hack-primary/10' : 'border-transparent text-hack-muted hover:text-hack-text hover:border-hack-border'}`}
          >
            Debugging
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-hack-bg custom-scrollbar">
          {activeTab === 'versions' && (
            <div className="space-y-8 max-w-2xl">
              <h2 className="text-2xl font-bold mb-6 text-hack-primary uppercase border-b border-hack-primary/30 pb-2">Version History</h2>
              
              <div className="border border-hack-border p-4 bg-hack-surface shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                <div className="flex justify-between items-center mb-4 border-b border-hack-border pb-2">
                  <h3 className="text-xl text-white font-bold flex items-center gap-2">Version 1.0 <span className="text-xs font-bold text-hack-bg bg-hack-primary px-2 py-0.5 rounded tracking-widest uppercase">Stable Build</span></h3>
                  <span className="text-hack-muted text-sm font-mono">June 2026</span>
                </div>
                <div className="mb-4">
                  <p className="text-hack-text text-sm leading-relaxed mb-2">The monumental v1.0 release establishes Synapse Network as a complete, zero-trust decentralized collaboration suite designed for local area networks and offline edge environments.</p>
                </div>
                <h4 className="text-xs text-hack-primary font-bold uppercase tracking-widest mb-2 border-b border-hack-primary/20 pb-1">Changelog Highlights</h4>
                <ul className="space-y-3 text-sm text-hack-muted list-none pl-0">
                  <li className="flex gap-3 items-start"><span className="text-hack-primary mt-1">▶</span> <div><strong className="text-white">Admin Telemetry Dashboard:</strong> Added detailed Server Diagnostics & Admin panel providing real-time memory pressure, active process inspection, and room load analysis.</div></li>
                  <li className="flex gap-3 items-start"><span className="text-hack-primary mt-1">▶</span> <div><strong className="text-white">LAN QR Discovery Auto-Routing:</strong> Implemented dynamically generated QR codes for multiple host IP interfaces allowing near-instant mobile bridging to the active workspace room over local subnets.</div></li>
                  <li className="flex gap-3 items-start"><span className="text-hack-primary mt-1">▶</span> <div><strong className="text-white">Core Network Relay Pipeline:</strong> Overhauled Node.js buffer streaming to eliminate backpressure memory overflows. Fixed server timeouts that historically caused large multi-gigabyte file transfers over LAN to halt prematurely.</div></li>
                  <li className="flex gap-3 items-start"><span className="text-hack-primary mt-1">▶</span> <div><strong className="text-white">System Documentation Manual:</strong> Integrated this persistent, embedded system documentation manual granting autonomous operational guidance off-grid.</div></li>
                  <li className="flex gap-3 items-start"><span className="text-hack-primary mt-1">▶</span> <div><strong className="text-white">Terminal Client Implementation:</strong> Added an interactive bash-like terminal emulation layer for issuing administrative console commands.</div></li>
                  <li className="flex gap-3 items-start"><span className="text-hack-primary mt-1">▶</span> <div><strong className="text-white">Snippet Vault Secure Storage:</strong> Added a snippet manager capable of locally storing sensitive code fragments securely.</div></li>
                  <li className="flex gap-3 items-start"><span className="text-hack-primary mt-1">▶</span> <div><strong className="text-white">Whiteboard Synchronization:</strong> Fully polished the Y.js conflict-free replicated data types (CRDTs) to ensure flawless multi-peer canvas operations without locking.</div></li>
                </ul>
              </div>

              <div className="border border-hack-border p-4 bg-hack-bg opacity-70 transition-opacity hover:opacity-100">
                <div className="flex justify-between items-center mb-4 border-b border-hack-border pb-2">
                  <h3 className="text-xl text-gray-400 font-bold flex items-center gap-2">Version 0.9 <span className="text-xs text-gray-400 border border-gray-600 px-2 py-0.5 rounded tracking-widest uppercase">BETA Release</span></h3>
                  <span className="text-hack-muted text-sm font-mono">May 2026</span>
                </div>
                <ul className="space-y-3 text-sm text-gray-500 list-none pl-0">
                  <li className="flex gap-3 items-start"><span className="text-gray-600 mt-1">▶</span> <div><strong className="text-gray-400">Core Engine:</strong> Socket.IO basic integration and state syncing routines established.</div></li>
                  <li className="flex gap-3 items-start"><span className="text-gray-600 mt-1">▶</span> <div><strong className="text-gray-400">UI Architecture:</strong> Terminal-inspired hacker visual theme mapped to Tailwind variables.</div></li>
                  <li className="flex gap-3 items-start"><span className="text-gray-600 mt-1">▶</span> <div><strong className="text-gray-400">Prototyping:</strong> Initial rough client-to-client relay endpoints designed, with memory leak issues still present.</div></li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'manual' && (
            <div className="max-w-4xl pb-12">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {manualMd}
              </ReactMarkdown>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="max-w-4xl pb-12">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {featuresMd}
              </ReactMarkdown>
            </div>
          )}

          {activeTab === 'debugging' && (
            <div className="space-y-8 max-w-3xl text-hack-muted text-sm leading-relaxed">
              <h2 className="text-2xl font-bold mb-6 text-hack-primary uppercase border-b border-hack-primary/30 pb-2">Error Debugging & Diagnostics Playbook</h2>
              
              <div className="space-y-6 bg-hack-bg border border-hack-border p-6 rounded-sm">
                
                <div className="border-l-4 border-red-500 pl-4 py-2 hover:bg-red-900/10 transition-colors">
                  <h4 className="text-red-400 font-bold text-lg mb-2 flex justify-between">
                    <span>ERR_CONNECTION_REFUSED / ERR_TIMED_OUT</span>
                    <span className="text-xs bg-red-900/50 text-red-300 px-2 py-1 rounded">TCP/IP Layer</span>
                  </h4>
                  <div className="space-y-3">
                     <p className="text-white"><strong>Condition:</strong> The client machine's browser perpetually spins trying to hit the Host IP (e.g. 192.168.1.5) and eventually throws a network death error.</p>
                     <p><strong>Root Analysis:</strong> The client machine cannot establish routing to the host Node HTTP/WebSocket port. This is exceptionally common in enterprise or strict isolated home networks.</p>
                     <div className="bg-hack-surface p-3 border border-hack-border/50 text-xs font-mono text-gray-300">
                        <strong>RESOLUTION MATRIX:</strong>
                        <ul className="list-decimal pl-4 mt-2 space-y-1 marker:text-red-400">
                          <li>Check Subnets: Are both machines on strictly the same 255.255.255.0 subnet segment? E.g. Client is 192.168.1.50, Node is 192.168.1.10.</li>
                          <li>Windows Firewall: Defender silently blocks incoming Node.exe traffic. You MUST explicitly open Inbound Port 3000 TCP/UDP or alter the network profile from "Public" to "Private".</li>
                          <li>AP Isolation: Check if your Wi-Fi router has "Client Isolation" or "Guest Mode" activated, which physically blocks peers from talking directly.</li>
                        </ul>
                     </div>
                  </div>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4 py-2 hover:bg-yellow-900/10 transition-colors mt-6">
                  <h4 className="text-yellow-400 font-bold text-lg mb-2 flex justify-between">
                    <span>WARN_BUFFER_OVERFLOW / RELAY_STALL</span>
                    <span className="text-xs bg-yellow-900/50 text-yellow-300 px-2 py-1 rounded">Application Layer</span>
                  </h4>
                  <div className="space-y-3">
                     <p className="text-white"><strong>Condition:</strong> A user clicks a large file (approx &gt;2GB) in the File Directory to download, but the speed drops to 0 Kbps instantly, and the file acts corrupted.</p>
                     <p><strong>Root Analysis:</strong> Browsers intentionally kill active javascript-managed fetch streams and networking buffers when a visual tab is placed in the background or heavily throttled by the OS CPU scheduler.</p>
                     <div className="bg-hack-surface p-3 border border-hack-border/50 text-xs font-mono text-gray-300">
                        <strong>RESOLUTION MATRIX:</strong>
                        <ul className="list-decimal pl-4 mt-2 space-y-1 marker:text-yellow-400">
                          <li>Foreground Tab rule: The Host machine running the Node runtime MUST remain active and un-suspended. Do not minimize the Synapse browser window during multi-gigabyte transfers.</li>
                          <li>Buffer Sizes: Extreme network speeds over ethernet bridging can cause node pipe buffers to fill faster than Disk I/O speeds on old HDD drives. Use SSDs.</li>
                        </ul>
                     </div>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2 hover:bg-blue-900/10 transition-colors mt-6">
                  <h4 className="text-blue-400 font-bold text-lg mb-2 flex justify-between">
                    <span>PROXY_UPGRADE_REJECTED / WEBSOCKET_DOWNGRADE</span>
                    <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded">Proxy Layer</span>
                  </h4>
                  <div className="space-y-3">
                     <p className="text-white"><strong>Condition:</strong> Inspecting Chrome DevTools Network Tab shows "Polling" requests instead of a single 101 WebSocket upgrade line. Latency across modules is extremely high.</p>
                     <p><strong>Root Analysis:</strong> A network security middlebox (like pfSense, Palo Alto, or NGINX running in front) is forcefully slicing the "Upgrade" header out of the HTTP request, blocking the WebSocket tunnel instantiation.</p>
                     <div className="bg-hack-surface p-3 border border-hack-border/50 text-xs font-mono text-gray-300">
                        <strong>RESOLUTION MATRIX:</strong>
                        <ul className="list-decimal pl-4 mt-2 space-y-1 marker:text-blue-400">
                          <li>If running behind a reverse proxy, you must guarantee strict header forwarding. In NGINX: <br/><code className="text-hack-primary block mt-1 ml-2">proxy_set_header Upgrade $http_upgrade;<br/>proxy_set_header Connection "upgrade";</code></li>
                          <li>Bypass DPI systems on the LAN.</li>
                        </ul>
                     </div>
                  </div>
                </div>

                <div className="border-l-4 border-hack-primary pl-4 py-2 hover:bg-hack-primary/10 transition-colors mt-6">
                  <h4 className="text-hack-primary font-bold text-lg mb-2 flex justify-between">
                    <span>SECURE_CONTEXT_DENIAL</span>
                    <span className="text-xs bg-hack-primary/20 text-hack-primary px-2 py-1 rounded">Browser Security Layer</span>
                  </h4>
                  <div className="space-y-3">
                     <p className="text-white"><strong>Condition:</strong> When joining a room via a raw IP address (e.g. 192.168.x.x), any attempt to interface with Cryptography APIs or Media components throws an immediate exception.</p>
                     <p><strong>Root Analysis:</strong> Modern Chromium frameworks (Chrome, Edge, Brave) enforce draconian restrictions on APIs when operating over unsecured HTTP protocols, blocking them outright to prevent man-in-the-middle data mining.</p>
                     <div className="bg-hack-surface p-3 border border-hack-border/50 text-xs font-mono text-gray-300">
                        <strong>RESOLUTION MATRIX:</strong>
                        <ul className="list-decimal pl-4 mt-2 space-y-1 marker:text-hack-primary">
                          <li><strong>Option A (Fastest on Chrome):</strong> Navigate to <code>chrome://flags/#unsafely-treat-insecure-origin-as-secure</code>. Input the Host's exact HTTP IP address. Restart the browser.</li>
                          <li><strong>Option B (Production):</strong> Install self-signed certificates into the Express server loop or tunnel the connection through a VPN (like Tailscale/ZeroTier) which acts as a trusted interface.</li>
                        </ul>
                     </div>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4 py-2 hover:bg-purple-900/10 transition-colors mt-6">
                  <h4 className="text-purple-400 font-bold text-lg mb-2 flex justify-between">
                    <span>CRDT_SPLIT_BRAIN / YJS_DESYNC</span>
                    <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded">Editor State Layer</span>
                  </h4>
                  <div className="space-y-3">
                     <p className="text-white"><strong>Condition:</strong> Two users looking at the Collaborative Code Editor see different text. Typed characters don't sync or overwrite each other randomly.</p>
                     <p><strong>Root Analysis:</strong> The underlying WebSocket connection dropped momentarily, or an intermediate message was lost. While Y.js is highly resilient, it can split-brain if the room state gets heavily modified while disconnected and the reconnection sync array is malformed.</p>
                     <div className="bg-hack-surface p-3 border border-hack-border/50 text-xs font-mono text-gray-300">
                        <strong>RESOLUTION MATRIX:</strong>
                        <ul className="list-decimal pl-4 mt-2 space-y-1 marker:text-purple-400">
                          <li>Host must close and reopen the file to broadcast the baseline state.</li>
                          <li>The desync client should refresh their browser tab. Y.js will pull down a clean state vector from the host connection.</li>
                        </ul>
                     </div>
                  </div>
                </div>

                <div className="border-l-4 border-orange-500 pl-4 py-2 hover:bg-orange-900/10 transition-colors mt-6">
                  <h4 className="text-orange-400 font-bold text-lg mb-2 flex justify-between">
                    <span>DOMException: The user aborted a request</span>
                    <span className="text-xs bg-orange-900/50 text-orange-300 px-2 py-1 rounded">File System API Layer</span>
                  </h4>
                  <div className="space-y-3">
                     <p className="text-white"><strong>Condition:</strong> When trying to share a live directory, the browser throws an error, or another user cannot pull a file from the shared directory.</p>
                     <p><strong>Root Analysis:</strong> The browser's File System Access API requires active transient user activation (a real click). Additionally, deeply nested files or restricted system folders (System32, root `/`) are strictly blocked by the browser.</p>
                     <div className="bg-hack-surface p-3 border border-hack-border/50 text-xs font-mono text-gray-300">
                        <strong>RESOLUTION MATRIX:</strong>
                        <ul className="list-decimal pl-4 mt-2 space-y-1 marker:text-orange-400">
                          <li>The Host MUST re-click the "Share Live Directory" button if the session expires or page refreshes. Permissions are not persisted across reloads.</li>
                          <li>Ensure the selected folder is a standard user project folder (e.g. `C:\Users\Name\Projects\App`), not a protected OS path.</li>
                        </ul>
                     </div>
                  </div>
                </div>

                <div className="border-l-4 border-teal-500 pl-4 py-2 hover:bg-teal-900/10 transition-colors mt-6">
                  <h4 className="text-teal-400 font-bold text-lg mb-2 flex justify-between">
                    <span>ERR_DECRYPT_BAD_AUTH_TAG</span>
                    <span className="text-xs bg-teal-900/50 text-teal-300 px-2 py-1 rounded">Crypto Layer</span>
                  </h4>
                  <div className="space-y-3">
                     <p className="text-white"><strong>Condition:</strong> Chat messages show up as "[Decryption Failed]", or files downloaded are corrupted and unopenable.</p>
                     <p><strong>Root Analysis:</strong> The AES-GCM authentication tag did not match. This explicitly means the Room Password on the client machine does NOT match the Room Password used to encrypt the payload upon transit.</p>
                     <div className="bg-hack-surface p-3 border border-hack-border/50 text-xs font-mono text-gray-300">
                        <strong>RESOLUTION MATRIX:</strong>
                        <ul className="list-decimal pl-4 mt-2 space-y-1 marker:text-teal-400">
                          <li>The user with corrupted files must re-enter the correct Room Password in their settings or URL parameters.</li>
                          <li>If the Host changed the room password dynamically, all prior encrypted payloads effectively became permanently unreadable format garble (which is working as intended).</li>
                        </ul>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
