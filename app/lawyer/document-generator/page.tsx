"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2, Download, Copy, Wand2 } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"

export default function LawyerDocumentGeneratorPage() {
  const [documentType, setDocumentType] = useState("")
  const [inputDetails, setInputDetails] = useState("")
  const [generatedDocument, setGeneratedDocument] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleGenerateDocument = async () => {
    if (!documentType || !inputDetails) {
      toast({
        title: "Missing Information",
        description: "Please select a document type and provide details.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setGeneratedDocument("")

    // Simulate API call to an AI document generation service
    await new Promise((resolve) => setTimeout(resolve, 2000))

    let generatedText = ""
    switch (documentType) {
      case "contract":
        generatedText = `
          CONTRACT AGREEMENT

          This Contract Agreement ("Agreement") is made and entered into on this ${new Date().toLocaleDateString()} by and between:

          Party A: [Name of Party A], with an address at [Address of Party A].
          Party B: [Name of Party B], with an address at [Address of Party B].

          WHEREAS, Party A and Party B desire to enter into an agreement concerning ${inputDetails}.

          NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, the parties agree as follows:

          1. Scope of Work: Party A agrees to ${inputDetails}.
          2. Payment Terms: Payment shall be made as per agreed terms.
          3. Term and Termination: This Agreement shall commence on the date first written above and continue until ${inputDetails}.
          4. Governing Law: This Agreement shall be governed by and construed in accordance with the laws of India.

          IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

          _________________________
          Party A Signature

          _________________________
          Party B Signature
        `
        break
      case "legal_notice":
        generatedText = `
          LEGAL NOTICE

          To,
          [Name of Recipient]
          [Address of Recipient]

          From,
          [Name of Sender]
          [Address of Sender]

          Date: ${new Date().toLocaleDateString()}

          Subject: Legal Notice regarding ${inputDetails}.

          Dear Sir/Madam,

          Under instructions from and on behalf of my client, ${inputDetails}, I hereby serve upon you the following legal notice:

          1. That my client has a claim against you concerning ${inputDetails}.
          2. That despite repeated requests, you have failed to address this matter.

          You are hereby called upon to ${inputDetails} within 15 days from the receipt of this notice, failing which my client will be constrained to initiate appropriate legal proceedings against you, entirely at your risk as to cost and consequences.

          Yours faithfully,

          [Advocate's Name]
          [Advocate's Signature]
        `
        break
      case "affidavit":
        generatedText = `
          AFFIDAVIT

          I, [Your Name], son/daughter of [Father's Name], aged about [Your Age] years, residing at [Your Address], do hereby solemnly affirm and state on oath as follows:

          1. That I am the deponent herein and am well acquainted with the facts of the case.
          2. That ${inputDetails}.
          3. That the statements made above are true and correct to the best of my knowledge and belief.

          Deponent

          Verification:
          Verified at [Place] on this [Day] day of [Month], [Year] that the contents of the above affidavit are true and correct to my knowledge and belief and nothing material has been concealed therefrom.

          Deponent
        `
        break
      default:
        generatedText = `Please select a valid document type to generate. Details provided: ${inputDetails}`
    }

    setGeneratedDocument(generatedText.trim())
    setIsLoading(false)
    toast({
      title: "Document Generated!",
      description: "Your document has been successfully generated.",
    })
  }

  const handleCopyDocument = () => {
    navigator.clipboard.writeText(generatedDocument)
    toast({
      title: "Copied to Clipboard",
      description: "The generated document has been copied.",
    })
  }

  const handleDownloadDocument = () => {
    const element = document.createElement("a")
    const file = new Blob([generatedDocument], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${documentType || "generated_document"}_${new Date().toISOString().slice(0, 10)}.txt`
    document.body.appendChild(element) // Required for Firefox
    element.click()
    document.body.removeChild(element) // Clean up
    toast({
      title: "Download Started",
      description: "Your document is being downloaded.",
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">AI Document Generator</h1>
            <p className="text-gray-400">Generate legal documents quickly with AI assistance.</p>
          </div>
        </div>

        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Generate New Document</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="document-type" className="text-gray-300">
                Document Type
              </Label>
              <Select value={documentType} onValueChange={setDocumentType} disabled={isLoading}>
                <SelectTrigger className="w-full bg-gray-800/50 border-gray-700 text-white focus:ring-yellow-400">
                  <SelectValue placeholder="Select a document type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white">
                  <SelectItem value="contract">Contract Agreement</SelectItem>
                  <SelectItem value="legal_notice">Legal Notice</SelectItem>
                  <SelectItem value="affidavit">Affidavit</SelectItem>
                  {/* Add more document types as needed */}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="input-details" className="text-gray-300">
                Key Details / Instructions
              </Label>
              <Textarea
                id="input-details"
                placeholder="e.g., 'a service agreement between John Doe and Jane Smith for web development services, payment of $5000 upon completion', or 'a legal notice to a tenant for non-payment of rent for 3 months at Flat No. 101, ABC Apartments'."
                value={inputDetails}
                onChange={(e) => setInputDetails(e.target.value)}
                className="min-h-[120px] bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-yellow-400"
                disabled={isLoading}
              />
            </div>

            <Button
              onClick={handleGenerateDocument}
              disabled={isLoading || !documentType || !inputDetails}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" /> Generate Document
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {generatedDocument && (
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Generated Document</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={generatedDocument}
                readOnly
                className="min-h-[300px] bg-gray-800/50 border-gray-700 text-white"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleCopyDocument}
                  variant="outline"
                  className="flex-1 bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                >
                  <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
                <Button
                  onClick={handleDownloadDocument}
                  variant="outline"
                  className="flex-1 bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                >
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
