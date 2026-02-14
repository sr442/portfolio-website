import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built by{" "}
                        <a
                            href="https://linkedin.com/in/shubhankarrana"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            Shubhankar Rana
                        </a>
                        . The source code is available on{" "}
                        <a
                            href="https://github.com/sr442"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            GitHub
                        </a>
                        .
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <a href="https://github.com/sr442" className="text-muted-foreground hover:text-foreground">
                        <Github className="h-5 w-5" />
                    </a>
                    <a href="https://linkedin.com/in/shubhankarrana" className="text-muted-foreground hover:text-foreground">
                        <Linkedin className="h-5 w-5" />
                    </a>
                    <a href="mailto:shubhankar.rana@example.com" className="text-muted-foreground hover:text-foreground">
                        <Mail className="h-5 w-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
