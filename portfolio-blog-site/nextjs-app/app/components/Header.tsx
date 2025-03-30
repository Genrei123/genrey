import Link from "next/link";

export default function Header() {
  return (
      <div className="sticky navbar bg-[#0d1b2a] shadow-sm text-[#e0e1dd]">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl" href = "/">Genrey O. Cristobal</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><a>Projects</a></li>
            <li><a>Blog</a></li>
            <li>
              <details>
                <summary>Socials</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li><a>LinkedIN</a></li>
                  <li><a>YouTube</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
  );
}
