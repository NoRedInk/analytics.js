let pkgs = import <nixpkgs> { };

in
pkgs.mkShell rec {
  name = "Analytics.js";

  buildInputs = with pkgs; [
    nodejs
    esbuild
  ];
}
